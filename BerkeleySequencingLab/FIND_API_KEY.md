# How to Find Your Supabase API Key

## Quick Answer

The API key you need is called the **"anon public" key** (also called "anon key" or "public key"). It's safe to use in client-side code.

## Step-by-Step Instructions

### 1. Go to Supabase Dashboard
- Open: https://app.supabase.com
- Sign in to your account

### 2. Select Your Project
- Click on your project name (or create a new project if you don't have one)

### 3. Navigate to API Settings
- In the left sidebar, click **Settings** (⚙️ gear icon)
- Click **API** in the settings menu

### 4. Find the API Keys Section
You'll see a section called **"Project API keys"** with two keys:

#### ✅ **anon public** (Use This One!)
- **Location**: Under "Project API keys" → "anon public"
- **What it looks like**: A long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE3NzQwMTU0MjJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Why use it**: Safe for client-side code, respects Row Level Security (RLS) policies
- **Copy it**: Click the eye icon (👁️) to reveal it, then click the copy button

#### ❌ **service_role** (Don't Use This One!)
- **Location**: Under "Project API keys" → "service_role"
- **Warning**: This key has admin access - **NEVER** use it in client-side code!
- **Only use**: On secure server-side code

### 5. Also Copy the Project URL
- **Location**: Under "Project URL" section
- **What it looks like**: `https://xxxxxxxxxxxxx.supabase.co`
- **Example**: `https://abcdefghijklmnop.supabase.co`
- **Copy it**: Click the copy button next to it

## Update Your .env.local File

After copying both values, update your `frontend/.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

**Replace:**
- `your_supabase_project_url` → Your actual Project URL
- `your_supabase_anon_key` → Your actual anon public key

## Visual Guide

In the Supabase dashboard, you'll see something like this:

```
┌─────────────────────────────────────────┐
│ Settings > API                          │
├─────────────────────────────────────────┤
│                                         │
│ Project URL                             │
│ https://xxxxx.supabase.co  [Copy]       │
│                                         │
│ Project API keys                        │
│                                         │
│ anon public                             │
│ eyJhbGciOiJIUzI1NiIs...  [👁️] [Copy]   │
│                                         │
│ service_role                            │
│ eyJhbGciOiJIUzI1NiIs...  [👁️] [Copy]   │
│ ⚠️ Keep this secret!                    │
└─────────────────────────────────────────┘
```

## What the API Key Does

The anon public key:
- Allows your Next.js app to connect to Supabase
- Authenticates API requests from your frontend
- Respects your database security policies (RLS)
- Is safe to expose in client-side code (it's designed for this)

## Troubleshooting

**Q: I don't see the anon key?**
- Make sure you're in **Settings > API**
- Click the eye icon (👁️) to reveal hidden keys
- The key might be collapsed - look for a toggle/expand button

**Q: Which key should I use?**
- Always use the **anon public** key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Never use the service_role key in client-side code

**Q: My key is very long, is that normal?**
- Yes! API keys are typically 100+ characters long
- They're JWT tokens (JSON Web Tokens)
- Make sure you copy the entire key, including the dots (.)

## After Updating

1. Save your `.env.local` file
2. **Restart your frontend server** (important!)
   - Stop the server (Ctrl+C)
   - Start it again: `npm run dev`
3. Refresh your browser
4. The error should be gone!

