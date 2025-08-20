-- Fix critical donations table security vulnerability
-- The current policies allow potential exposure of donor contact information

-- Keep the existing INSERT policy but make it more explicit about its purpose
-- This is needed for the donation widget to work for both authenticated and unauthenticated users
-- But we'll add additional security measures

-- Update the "Users can view their own donations" policy to be more secure
-- and handle cases where users might not have profiles yet
DROP POLICY IF EXISTS "Users can view their own donations" ON donations;

CREATE POLICY "Users can view their own donations" 
ON donations 
FOR SELECT 
USING (
  -- Allow users to see donations where the donor_email matches their auth email
  donor_email = auth.jwt() ->> 'email'
);

-- Add a policy to prevent unauthorized access to donation data
-- This ensures that even if someone tries to access donations, they can only see their own
CREATE POLICY "Prevent unauthorized donation access" 
ON donations 
FOR SELECT 
USING (
  -- Only allow access if user is admin, super_admin, or it's their own donation
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role) OR
  donor_email = auth.jwt() ->> 'email'
);

-- Remove the old admin policies since we now have a comprehensive policy above
DROP POLICY IF EXISTS "Admins can view all donations" ON donations;
DROP POLICY IF EXISTS "Super admins can view all donations" ON donations;