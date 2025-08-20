-- Update david.wanjau@deevabits.com to super_admin role
UPDATE public.profiles 
SET role = 'super_admin' 
WHERE email = 'david.wanjau@deevabits.com';

-- Update the trigger function to automatically assign super_admin role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Determine role based on email
  DECLARE
    user_role app_role := 'user';
  BEGIN
    IF new.email = 'david.wanjau@deevabits.com' THEN
      user_role := 'super_admin';
    END IF;

    INSERT INTO public.profiles (user_id, email, display_name, role)
    VALUES (
      new.id,
      new.email,
      COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
      user_role
    );
    RETURN new;
  END;
END;
$$;

-- Create user management functions for super admins
CREATE OR REPLACE FUNCTION public.update_user_role(target_user_id uuid, new_role app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only super_admins can change roles
  IF NOT public.has_role(auth.uid(), 'super_admin') THEN
    RAISE EXCEPTION 'Only super admins can change user roles';
  END IF;
  
  UPDATE public.profiles 
  SET role = new_role 
  WHERE user_id = target_user_id;
  
  RETURN FOUND;
END;
$$;

-- Create function to list all users (for super admin)
CREATE OR REPLACE FUNCTION public.get_all_users()
RETURNS TABLE (
  user_id uuid,
  email text,
  display_name text,
  role app_role,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only super_admins can view all users
  IF NOT public.has_role(auth.uid(), 'super_admin') THEN
    RAISE EXCEPTION 'Only super admins can view all users';
  END IF;
  
  RETURN QUERY
  SELECT 
    p.user_id,
    p.email,
    p.display_name,
    p.role,
    p.created_at
  FROM public.profiles p
  ORDER BY p.created_at DESC;
END;
$$;