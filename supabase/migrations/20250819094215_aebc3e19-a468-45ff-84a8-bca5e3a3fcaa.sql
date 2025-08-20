-- Add super_admin to the role enum (must be in separate transaction)
ALTER TYPE public.app_role ADD VALUE 'super_admin';