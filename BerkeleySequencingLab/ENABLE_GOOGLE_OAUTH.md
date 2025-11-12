# How to Enable Google OAuth in Supabase

## Issue
You're seeing the error: `"Unsupported provider: provider is not enabled"` when trying to sign in with Google.

This means Google OAuth is not configured in your Supabase project. Follow these steps to enable it.

## Step 1: Go to Supabase Dashboard

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in to your account
3. Select your project

## Step 2: Configure Google OAuth

### Option A: Quick Setup (Recommended for Development)

1. **Navigate to Authentication Settings:**
   - In the left sidebar, click **Authentication**
   - Click **Providers** in the submenu

2. **Enable Google Provider:**
   - Find **Google** in the list of providers
   - Toggle it **ON** (enable it)
   - Click **Save**

3. **For Development (Local Testing):**
   - Supabase provides default Google OAuth credentials for development
   - These work for `localhost` and `127.0.0.1`
   - You can test Google sign-in immediately after enabling

### Option B: Custom Google OAuth Setup (Required for Production)

For production, you need to create your own Google OAuth credentials:

#### 1. Create Google OAuth Credentials

1. **Go to Google Cloud Console:**
   - Visit [https://console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create a New Project (or select existing):**
   - Click the project dropdown at the top
   - Click **New Project**
   - Enter a project name (e.g., "Berkeley Sequencing Lab")
   - Click **Create**

3. **Enable Google+ API:**
   - Go to **APIs & Services** > **Library**
   - Search for "Google+ API"
   - Click on it and click **Enable**

4. **Create OAuth 2.0 Credentials:**
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth client ID**
   - If prompted, configure the OAuth consent screen first:
     - Choose **External** (unless you have a Google Workspace)
     - Fill in the required information:
       - App name: "Berkeley Sequencing Lab"
       - User support email: Your email
       - Developer contact: Your email
     - Click **Save and Continue**
     - Add scopes: `email`, `profile`, `openid`
     - Click **Save and Continue**
     - Add test users (optional for development)
     - Click **Save and Continue**
     - Review and click **Back to Dashboard**

5. **Create OAuth Client ID:**
   - Application type: **Web application**
   - Name: "Berkeley Sequencing Lab Web"
   - **Authorized JavaScript origins:**
     - Add: `http://localhost:3000` (for development)
     - Add: `https://yourdomain.com` (for production)
   - **Authorized redirect URIs:**
     - Add: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
     - Replace `YOUR_PROJECT_REF` with your Supabase project reference
     - You can find your project reference in Supabase Dashboard > Settings > API
   - Click **Create**
   - **Copy the Client ID and Client Secret** (you'll need these)

#### 2. Configure Supabase with Google Credentials

1. **Go back to Supabase Dashboard:**
   - Navigate to **Authentication** > **Providers**
   - Find **Google** and toggle it **ON**

2. **Enter Google OAuth Credentials:**
   - **Client ID (for OAuth):** Paste your Google Client ID
   - **Client Secret (for OAuth):** Paste your Google Client Secret
   - Click **Save**

## Step 3: Configure Redirect URLs

1. **In Supabase Dashboard:**
   - Go to **Authentication** > **URL Configuration**
   - **Site URL:** Set to your production URL (e.g., `https://yourdomain.com`)
   - **Redirect URLs:** Add:
     - `http://localhost:3000/auth/callback` (for development)
     - `https://yourdomain.com/auth/callback` (for production)

2. **In Google Cloud Console:**
   - Make sure you've added the redirect URI:
     - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - Replace `YOUR_PROJECT_REF` with your actual Supabase project reference

## Step 4: Update Your Application

Your application code is already configured correctly. The OAuth flow will:
1. Redirect users to Google's sign-in page
2. After authentication, redirect back to `/auth/callback`
3. The callback handler will exchange the code for a session
4. User will be redirected to `/home`

## Step 5: Test Google OAuth

1. **Start your development server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Test the flow:**
   - Go to `http://localhost:3000/login`
   - Click "Sign in with Google"
   - You should be redirected to Google's sign-in page
   - After signing in, you should be redirected back to your app
   - You should be logged in and redirected to `/home`

## Troubleshooting

### Error: "provider is not enabled"
- **Solution:** Make sure Google provider is toggled ON in Supabase Dashboard > Authentication > Providers

### Error: "redirect_uri_mismatch"
- **Solution:** 
  - Check that the redirect URI in Google Cloud Console matches: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
  - Make sure your Supabase project reference is correct
  - The redirect URI must be exactly the same (including https and no trailing slash)

### Error: "invalid_client"
- **Solution:**
  - Verify that Client ID and Client Secret are correct in Supabase
  - Make sure you copied them correctly (no extra spaces)
  - Regenerate credentials in Google Cloud Console if needed

### Google Sign-in works but user is not created
- **Solution:**
  - Check Supabase Authentication > Users to see if the user was created
  - Check the browser console for errors
  - Verify that the callback route is working: `/auth/callback`

### OAuth works in development but not production
- **Solution:**
  - Make sure you've added your production domain to:
    - Google Cloud Console > Authorized JavaScript origins
    - Supabase > Authentication > URL Configuration > Redirect URLs
  - Update Site URL in Supabase to your production URL
  - Make sure your production site uses HTTPS

## Additional Resources

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

## Security Notes

1. **Never expose your Client Secret:**
   - The Client Secret should only be stored in Supabase Dashboard
   - Never commit it to version control
   - Never expose it in client-side code

2. **Use HTTPS in Production:**
   - OAuth requires HTTPS in production
   - Make sure your production site uses HTTPS

3. **Restrict Authorized Origins:**
   - Only add domains you actually use
   - Don't use wildcards in production
   - Regularly review and remove unused domains

4. **Monitor OAuth Usage:**
   - Check Supabase logs for suspicious activity
   - Monitor Google Cloud Console for unusual API usage
   - Set up alerts for failed authentication attempts

## Quick Checklist

- [ ] Google provider enabled in Supabase
- [ ] Google OAuth credentials created (for production)
- [ ] Client ID and Client Secret added to Supabase
- [ ] Redirect URI configured in Google Cloud Console
- [ ] Site URL configured in Supabase
- [ ] Redirect URLs added in Supabase
- [ ] Tested in development
- [ ] Tested in production (if applicable)
- [ ] HTTPS enabled (for production)
- [ ] Error handling tested

## Need Help?

If you're still having issues:
1. Check the browser console for errors
2. Check Supabase logs: Dashboard > Logs > Auth Logs
3. Verify all configuration steps were completed
4. Make sure you're using the correct project reference
5. Contact Supabase support if needed

