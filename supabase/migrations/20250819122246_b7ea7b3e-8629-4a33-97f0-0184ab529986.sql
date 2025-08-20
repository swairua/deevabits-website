-- Fix critical profiles table security vulnerability
-- Remove the dangerous policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

-- Create secure policy: users can only view their own profile
CREATE POLICY "Users can view their own profile" 
ON profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for admins to view all profiles (needed for admin dashboard)
CREATE POLICY "Admins can view all profiles" 
ON profiles 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);