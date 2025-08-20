-- Fix Function Search Path Security Issues
-- Update has_role function to set secure search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update handle_new_user function to set secure search_path  
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Update get_all_users function to set secure search_path
CREATE OR REPLACE FUNCTION public.get_all_users()
RETURNS TABLE(user_id uuid, email text, display_name text, role app_role, created_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Update update_user_role function to set secure search_path
CREATE OR REPLACE FUNCTION public.update_user_role(target_user_id uuid, new_role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Update update_updated_at_column function to set secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;