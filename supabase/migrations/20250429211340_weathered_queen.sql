/*
  # Create user accounts and packages tables

  1. New Tables
    - `packages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (integer, in cents)
      - `credits` (integer)
      - `description` (text)
      - `features` (text[])
      - `created_at` (timestamptz)

    - `user_accounts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `credits` (integer)
      - `active_package_id` (uuid, references packages)
      - `created_at` (timestamptz)

    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `package_id` (uuid, references packages)
      - `amount` (integer, in cents)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL,
  credits integer NOT NULL,
  description text,
  features text[],
  created_at timestamptz DEFAULT now()
);

-- Create user_accounts table
CREATE TABLE IF NOT EXISTS user_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  credits integer DEFAULT 0,
  active_package_id uuid REFERENCES packages,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  package_id uuid REFERENCES packages NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read packages"
  ON packages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own account"
  ON user_accounts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert default packages
INSERT INTO packages (name, price, credits, description, features)
VALUES
  ('Starter Shot', 100, 1, '1 upload = 3 creative shots', ARRAY['1 upload', '3 creative shots', 'Instant generation', 'Download in HD']),
  ('Mini Pack', 700, 10, '10 uploads = 10 creative sets', ARRAY['10 uploads', '10 creative sets', 'Designed for small collections', '1 free extra style variation']),
  ('Power Pack', 3000, 50, '50 uploads = 50 creative sets', ARRAY['50 uploads', '50 creative sets', 'Best for growing brands', 'Priority generation included']),
  ('Unlimited Studio', 9900, 600, '600 uploads per month', ARRAY['600 uploads per month', 'Access premium moods and variations', 'Priority queue + dedicated support']);