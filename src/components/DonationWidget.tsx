import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, CreditCard, Smartphone, Building, Globe, Shield, Mail, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Multi-currency donation tiers
const currencyTiers = {
  KES: [
    { amount: 1000, description: "Provides solar lights for a family", icon: "💡" },
    { amount: 5000, description: "Powers a home for a month", icon: "🏠" },
    { amount: 10000, description: "Supports a women entrepreneur", icon: "👩‍💼" },
    { amount: 25000, description: "Electrifies a small clinic", icon: "🏥" },
  ],
  USD: [
    { amount: 10, description: "Provides solar lights for a family", icon: "💡" },
    { amount: 50, description: "Powers a home for a month", icon: "🏠" },
    { amount: 100, description: "Supports a women entrepreneur", icon: "👩‍💼" },
    { amount: 250, description: "Electrifies a small clinic", icon: "🏥" },
  ],
  EUR: [
    { amount: 9, description: "Provides solar lights for a family", icon: "💡" },
    { amount: 45, description: "Powers a home for a month", icon: "🏠" },
    { amount: 90, description: "Supports a women entrepreneur", icon: "👩‍💼" },
    { amount: 225, description: "Electrifies a small clinic", icon: "🏥" },
  ],
  GBP: [
    { amount: 8, description: "Provides solar lights for a family", icon: "💡" },
    { amount: 40, description: "Powers a home for a month", icon: "🏠" },
    { amount: 80, description: "Supports a women entrepreneur", icon: "👩‍💼" },
    { amount: 200, description: "Electrifies a small clinic", icon: "🏥" },
  ],
};

const currencies = [
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KES' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
];

const projects = [
  { id: 'general', name: 'General Solar Fund', description: 'Support our most urgent needs' },
  { id: 'women', name: 'Women Entrepreneurs', description: 'Empower female solar entrepreneurs' },
  { id: 'schools', name: 'Solar for Schools', description: 'Bring solar power to rural schools' },
  { id: 'health', name: 'Healthcare Clinics', description: 'Power rural health facilities' },
];

interface DonationWidgetProps {
  className?: string;
  initialProject?: string | null;
}

export const DonationWidget = ({ className, initialProject }: DonationWidgetProps = {}) => {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedProject, setSelectedProject] = useState<string>(initialProject || "general");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    country: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const currentTiers = currencyTiers[currency as keyof typeof currencyTiers];
  const currentCurrency = currencies.find(c => c.code === currency);

  const handleTierSelect = (tier: typeof currentTiers[0]) => {
    setSelectedTier(tier.amount.toString());
    setAmount(tier.amount.toString());
  };

  const handleDonate = async () => {
    if (!amount || !donorInfo.name || !donorInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Only include project_id if it's a valid UUID (to match database constraints)
      const isValidUUID = selectedProject && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(selectedProject);
      
      const donationData = {
        amount: parseFloat(amount),
        currency: currency,
        donor_name: donorInfo.name,
        donor_email: donorInfo.email,
        is_recurring: isRecurring,
        payment_method: paymentMethod,
        status: 'pending'
      };

      // Only add project_id if it's a valid UUID
      if (isValidUUID) {
        (donationData as any).project_id = selectedProject;
      }

      const { error } = await supabase
        .from('donations')
        .insert(donationData);

      if (error) {
        throw error;
      }

      toast({
        title: "Thank You!",
        description: `Your donation intent for ${currentCurrency?.symbol}${amount} has been recorded. Payment processing will be available soon.`,
      });

      // Reset form
      setAmount("");
      setSelectedTier("");
      setDonorInfo({ name: "", email: "", country: "", message: "" });
      
    } catch (error) {
      console.error('Error recording donation:', error);
      toast({
        title: "Error",
        description: "There was an error recording your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-2 text-3xl">
          <Heart className="h-8 w-8 text-red-500" />
          Join Our Mission
        </CardTitle>
        <CardDescription className="text-lg">
          Your donation directly funds solar installations, training programs, and community development
        </CardDescription>
        <div className="flex justify-center gap-4 mt-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Secure & Encrypted
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Global Donations Welcome
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Gift className="h-3 w-3" />
            Tax Deductible
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Donation Details */}
          <div className="space-y-6">
            {/* Currency Selection */}
            <div>
              <Label className="text-base font-medium">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Donation Tiers */}
            <div>
              <Label className="text-base font-medium">Choose Your Impact</Label>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {currentTiers.map((tier) => (
                  <Button
                    key={tier.amount}
                    variant={selectedTier === tier.amount.toString() ? "default" : "outline"}
                    className="h-auto p-4 text-left flex-col items-start space-y-1"
                    onClick={() => handleTierSelect(tier)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-lg">{tier.icon}</span>
                      <span className="font-semibold">{currentCurrency?.symbol}{tier.amount}</span>
                    </div>
                    <span className="text-sm opacity-80">{tier.description}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label htmlFor="custom-amount">Custom Amount ({currentCurrency?.symbol})</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSelectedTier("");
                }}
              />
            </div>

            {/* Project Selection */}
            <div>
              <Label className="text-base font-medium">Support a Specific Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recurring Option */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="recurring" className="text-sm">
                Make this a monthly recurring donation
              </Label>
              {isRecurring && (
                <Badge variant="secondary" className="ml-2">
                  Monthly
                </Badge>
              )}
            </div>
          </div>

          {/* Right Column - Donor Information */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    Credit/Debit Card (International)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    M-Pesa (Kenya)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                    <Building className="h-4 w-4 text-gray-600" />
                    Bank Transfer
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Your Information</Label>
              
              <div>
                <Label htmlFor="donor-name">Full Name *</Label>
                <Input
                  id="donor-name"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="donor-email">Email *</Label>
                <Input
                  id="donor-email"
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="donor-country">Country</Label>
                <Input
                  id="donor-country"
                  value={donorInfo.country}
                  onChange={(e) => setDonorInfo({ ...donorInfo, country: e.target.value })}
                  placeholder="Your country"
                />
              </div>
              
              <div>
                <Label htmlFor="donor-message">Message (Optional)</Label>
                <Textarea
                  id="donor-message"
                  value={donorInfo.message}
                  onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                  placeholder="Leave a message of support..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleDonate}
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
            size="lg"
          >
            <Heart className="mr-2 h-5 w-5" />
            {isSubmitting ? "Processing..." : `Donate ${currentCurrency?.symbol}${amount || "0"}${isRecurring ? " Monthly" : ""}`}
          </Button>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Instant Receipt</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-4 w-4" />
              <span>100% to Projects</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};