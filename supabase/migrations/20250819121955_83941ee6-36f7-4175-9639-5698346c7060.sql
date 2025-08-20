-- Fix newsletter subscriptions security vulnerability
-- Remove the overly permissive SELECT policy that allows any authenticated user to view all subscriber emails
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON newsletter_subscriptions;

-- Create a new policy that only allows admins and super_admins to view subscriber data
CREATE POLICY "Only admins can view newsletter subscriptions" 
ON newsletter_subscriptions 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);