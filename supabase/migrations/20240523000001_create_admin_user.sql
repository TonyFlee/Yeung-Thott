-- Create admin user if it doesn't exist
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role_id)
SELECT 
  gen_random_uuid(), 
  'yeungthott@gmail.com',
  crypt('@YeungThott@66', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
  '{"role":"admin"}'::jsonb,
  false,
  (SELECT id FROM auth.roles WHERE name = 'authenticated')
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'yeungthott@gmail.com');

-- Create corresponding entry in public.users table
INSERT INTO public.users (id, email, role)
SELECT 
  id, 
  email, 
  'admin'
FROM auth.users 
WHERE email = 'yeungthott@gmail.com'
ON CONFLICT (id) DO NOTHING;

-- Confirm the email for the admin user
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'yeungthott@gmail.com' AND email_confirmed_at IS NULL;
