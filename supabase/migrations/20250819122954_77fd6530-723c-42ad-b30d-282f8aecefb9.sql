-- Fix overly permissive RLS policies on content tables
-- This is a critical security fix to prevent authenticated users from seeing all content

-- Fix blog_posts SELECT policy - only published posts should be public
DROP POLICY IF EXISTS "Everyone can view published posts" ON blog_posts;
CREATE POLICY "Everyone can view published posts" 
ON blog_posts 
FOR SELECT 
USING (is_published = true);

-- Fix donors SELECT policy - only active donors should be public
DROP POLICY IF EXISTS "Everyone can view active donors" ON donors;
CREATE POLICY "Everyone can view active donors" 
ON donors 
FOR SELECT 
USING (is_active = true);

-- Fix products SELECT policy - only active products should be public
DROP POLICY IF EXISTS "Everyone can view active products" ON products;
CREATE POLICY "Everyone can view active products" 
ON products 
FOR SELECT 
USING (is_active = true);

-- Fix projects SELECT policy - only public projects should be public
DROP POLICY IF EXISTS "Everyone can view public projects" ON projects;
CREATE POLICY "Everyone can view public projects" 
ON projects 
FOR SELECT 
USING (is_public = true);

-- Fix reports SELECT policy - only public and active reports should be public
DROP POLICY IF EXISTS "Everyone can view public reports" ON reports;
CREATE POLICY "Everyone can view public reports" 
ON reports 
FOR SELECT 
USING ((is_public = true) AND (is_active = true));

-- Fix solar_packages SELECT policy - only active packages should be public
DROP POLICY IF EXISTS "Everyone can view active packages" ON solar_packages;
CREATE POLICY "Everyone can view active packages" 
ON solar_packages 
FOR SELECT 
USING (is_active = true);

-- Remove automatic super_admin assignment from handle_new_user function
-- All users should default to 'user' role for security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- All users default to 'user' role for security
  -- Super admin roles must be assigned manually via update_user_role function
  INSERT INTO public.profiles (user_id, email, display_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'user'::app_role
  );
  RETURN new;
END;
$function$;