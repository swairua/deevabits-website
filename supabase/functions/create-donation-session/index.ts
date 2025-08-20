import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Restrict CORS to specific domains for security
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // TODO: Replace with specific domain in production
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Allowed currencies and validation constants
const ALLOWED_CURRENCIES = ["USD", "KES", "EUR", "GBP"];
const MIN_AMOUNT = 0.5;
const MAX_AMOUNT = 50000;
const BASE_URL = "https://zbsjcsqxbhmfujxdjrfz.supabase.co"; // Fixed base URL instead of dynamic origin

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      amount, 
      currency = "USD", 
      donorName, 
      donorEmail, 
      projectId = "general",
      isRecurring = false,
      paymentMethod = "card"
    } = await req.json();

    // Validate required fields
    if (!amount || !donorName || !donorEmail) {
      throw new Error("Missing required fields: amount, donorName, or donorEmail");
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < MIN_AMOUNT || numAmount > MAX_AMOUNT) {
      throw new Error(`Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT}`);
    }

    // Validate currency
    if (!ALLOWED_CURRENCIES.includes(currency.toUpperCase())) {
      throw new Error(`Currency must be one of: ${ALLOWED_CURRENCIES.join(', ')}`);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail)) {
      throw new Error("Invalid email format");
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe configuration missing");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client with service role key for database operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if a Stripe customer exists for this email
    const customers = await stripe.customers.list({ email: donorEmail, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: donorEmail,
        name: donorName,
      });
      customerId = customer.id;
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(numAmount * 100);

    // Use fixed URLs for security instead of dynamic origin
    const successUrl = `${BASE_URL}/impact?donation=success`;
    const cancelUrl = `${BASE_URL}/impact?donation=cancelled`;

    // Create donation session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: { 
              name: `Solar Impact Donation${projectId !== 'general' ? ` - ${projectId}` : ''}`,
              description: "Supporting clean energy access and economic empowerment in rural Kenya",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        donorName,
        donorEmail,
        projectId,
        isRecurring: isRecurring.toString(),
        paymentMethod,
      }
    });

    // Save donation record to Supabase
    const { error: dbError } = await supabaseService
      .from('donations')
      .insert([
        {
          amount: numAmount,
          currency: currency.toUpperCase(),
          donor_name: donorName,
          donor_email: donorEmail,
          payment_method: paymentMethod,
          is_recurring: isRecurring,
          project_id: projectId,
          status: 'pending',
          transaction_id: session.id,
        }
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
      // Don't fail the payment session creation due to database issues
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Donation session error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to create donation session"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});