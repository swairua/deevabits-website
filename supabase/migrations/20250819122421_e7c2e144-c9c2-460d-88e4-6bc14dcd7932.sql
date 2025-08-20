-- Clean up and consolidate donation security policies for better protection
-- Remove the duplicate policies and create one comprehensive secure policy

DROP POLICY IF EXISTS "Users can view their own donations" ON donations;
DROP POLICY IF EXISTS "Prevent unauthorized donation access" ON donations;

-- Create a single, comprehensive SELECT policy that securely handles all access
CREATE POLICY "Secure donation access" 
ON donations 
FOR SELECT 
USING (
  -- Allow admins and super_admins to view all donations (for admin dashboard)
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role) OR
  -- Allow donors to view only their own donations by matching email
  (auth.uid() IS NOT NULL AND donor_email = auth.jwt() ->> 'email')
);

-- Ensure the INSERT policy is properly documented and secure
-- The "Anyone can create donations" policy is necessary for the donation widget
-- but let's add a comment to clarify its purpose and security considerations
COMMENT ON POLICY "Anyone can create donations" ON donations IS 
'Allows donation widget to work for both authenticated and guest users. Donor information is validated on the frontend before submission.';

-- Add UPDATE and DELETE restrictions to prevent data tampering
-- Only admins should be able to modify donation records
CREATE POLICY "Only admins can update donations" 
ON donations 
FOR UPDATE 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Only admins can delete donations" 
ON donations 
FOR DELETE 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);