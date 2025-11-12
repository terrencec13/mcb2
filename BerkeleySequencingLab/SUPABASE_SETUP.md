# Supabase Setup Guide

## What is Supabase?

Supabase is a backend-as-a-service platform that provides:
- PostgreSQL database
- Authentication
- Storage
- API endpoints

You access Supabase through a web dashboard, not through code files.

## How to Access Supabase

### Step 1: Go to the Supabase Dashboard

1. Open your web browser
2. Go to: **https://app.supabase.com**
3. Sign in with your account (or create a new account if you don't have one)

### Step 2: Access Your Project

1. Once logged in, you'll see your **projects** (or an empty list if this is your first time)
2. Click on your project name (or create a new project)
3. You'll be taken to the project dashboard

## Key Areas in Supabase Dashboard

### 1. **Settings > API** (To Get Credentials)
   - Click **Settings** (gear icon) in the left sidebar
   - Click **API**
   - Here you'll find:
     - **Project URL** - Copy this for `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public key** - Copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **service_role key** - (Keep this secret! Only for server-side use)

### 2. **Table Editor** (To View/Create Database Tables)
   - Click **Table Editor** in the left sidebar
   - View existing tables
   - Create new tables
   - Edit table structure
   - View table data

### 3. **SQL Editor** (To Run SQL Queries)
   - Click **SQL Editor** in the left sidebar
   - Write and run SQL queries
   - Create tables, insert data, etc.
   - View query history

### 4. **Authentication** (To Manage Users)
   - Click **Authentication** in the left sidebar
   - Manage user accounts
   - Configure authentication providers (Google, GitHub, etc.)
   - View user sessions

### 5. **Storage** (To Manage File Storage)
   - Click **Storage** in the left sidebar
   - Create storage buckets
   - Upload/manage files
   - Set up access policies

## Getting Your API Credentials

To fix the error in your application, you need to get your API credentials:

1. **Navigate to Settings > API:**
   - In your Supabase project dashboard
   - Click **Settings** (⚙️ icon) in the left sidebar
   - Click **API** in the settings menu

2. **Copy the Project URL:**
   - Look for "Project URL" section
   - It will look like: `https://xxxxxxxxxxxxx.supabase.co`
   - Copy this entire URL

3. **Copy the anon/public key:**
   - Look for "Project API keys" section
   - Find the **anon public** key (this is safe to use in client-side code)
   - It's a long string that starts with `eyJ...`
   - Click the eye icon or copy button to reveal and copy it

4. **Update your .env.local file:**
   - Open `frontend/.env.local` in your code editor
   - Replace the placeholder values with your actual credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

## Database Tables Needed

Based on your application code, you'll need these tables in Supabase:

1. **dna_orders** - Stores DNA order information
2. **dna_samples** - Stores DNA sample details
3. **sequencing_data** - Stores sequencing data
4. **sequencing_samples** - Stores sequencing sample information
5. **organizations** - Stores organization data
6. **Storage bucket: file-upload** - For file uploads

You can create these tables using:
- **Table Editor** (visual interface)
- **SQL Editor** (write SQL CREATE TABLE statements)

## Quick Start Checklist

- [ ] Sign up/Log in to https://app.supabase.com
- [ ] Create a new project (or select existing one)
- [ ] Go to Settings > API
- [ ] Copy Project URL
- [ ] Copy anon/public key
- [ ] Update `frontend/.env.local` with your credentials
- [ ] Create necessary database tables
- [ ] Create storage bucket for file uploads
- [ ] Restart your frontend server

## Need Help?

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Supabase GitHub: https://github.com/supabase/supabase

