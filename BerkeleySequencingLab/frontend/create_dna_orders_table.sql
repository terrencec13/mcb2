-- Create dna_orders table
CREATE TABLE IF NOT EXISTS public.dna_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    sample_type TEXT,
    dna_type TEXT,
    dna_quantity TEXT,
    primer_details TEXT,
    plate_name TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS dna_orders_user_id_idx ON public.dna_orders(user_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS dna_orders_status_idx ON public.dna_orders(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS dna_orders_created_at_idx ON public.dna_orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.dna_orders ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own orders
CREATE POLICY "Users can view own orders"
    ON public.dna_orders
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy: Admins can view all orders
-- Note: This assumes you have an is_admin field in user_metadata or a separate admins table
-- Adjust the condition based on your admin checking mechanism
CREATE POLICY "Admins can view all orders"
    ON public.dna_orders
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'is_admin')::boolean = true
        )
    );

-- Create policy: Users can insert their own orders
CREATE POLICY "Users can insert own orders"
    ON public.dna_orders
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own orders
CREATE POLICY "Users can update own orders"
    ON public.dna_orders
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create policy: Admins can update all orders
CREATE POLICY "Admins can update all orders"
    ON public.dna_orders
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'is_admin')::boolean = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'is_admin')::boolean = true
        )
    );

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_dna_orders_updated_at
    BEFORE UPDATE ON public.dna_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

