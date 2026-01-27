# Database Migrations

## Running Migrations

To apply migrations, run them against your Supabase database:

1. Go to the Supabase dashboard
2. Open the SQL Editor
3. Paste and run each migration file in order

## Migration Files

- `001_add_products.sql` - Adds multi-product support with products table and product_id columns

## Notes

- All content tables now have a `product_id` column
- Default product_id is 'client-keeper' for backwards compatibility
- The products table stores product configuration (colors, settings)
