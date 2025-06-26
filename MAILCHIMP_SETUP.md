# MailChimp Newsletter Integration Setup

This guide explains how to configure the MailChimp integration for the newsletter signup form using the `_config.yml` file.

## Setup Instructions

### 1. Get Your MailChimp Credentials

1. **Log in to your MailChimp account**
2. **Get your Audience ID**:

   - Go to **Audience** → **Audience dashboard**
   - Click **Settings** → **Audience name and defaults**
   - Note your **Audience ID** (this is your List ID)

3. **Get your User ID and API Key**:

   - In MailChimp, go to **Account** → **Extras** → **API keys**
   - Copy your API key
   - The User ID is the part before the hyphen in your API key (e.g., if your API key is `abc123def456-us21`, your User ID is `abc123def456`)

4. **Get your Server Prefix**:
   - The server prefix is the part after the hyphen in your API key (e.g., `us21`, `us1`, etc.)

### 2. Update Configuration

Edit the `_config.yml` file and update the MailChimp section:

```yaml
# MailChimp Newsletter Configuration
mailchimp:
  enabled: true
  user_id: "YOUR_MAILCHIMP_USER_ID" # Replace with your MailChimp User ID
  list_id: "YOUR_MAILCHIMP_LIST_ID" # Replace with your MailChimp Audience/List ID
  api_key: "YOUR_MAILCHIMP_API_KEY" # Replace with your MailChimp API Key
  server_prefix: "us21" # Your MailChimp server prefix (e.g., us21, us1, etc.)
  form_action_url: "https://seaspraypools.us21.list-manage.com/subscribe/post" # Base URL for form submission
```

### 3. Example Configuration

If your credentials are:

- User ID: `abc123def456`
- List ID: `789xyz`
- API Key: `abc123def456-us21`
- Server Prefix: `us21`

Your configuration should be:

```yaml
mailchimp:
  enabled: true
  user_id: "abc123def456"
  list_id: "789xyz"
  api_key: "abc123def456-us21"
  server_prefix: "us21"
  form_action_url: "https://seaspraypools.us21.list-manage.com/subscribe/post"
```

### 4. Disable Newsletter (Optional)

To disable the newsletter functionality, set:

```yaml
mailchimp:
  enabled: false
```

## Features

- **Configuration-Based**: All MailChimp settings are managed in `_config.yml`
- **MailChimp Integration**: Subscribes users to your MailChimp audience list
- **Flowbite Modal**: Shows a beautiful success popup when subscription is successful
- **Form Validation**: Validates email format before submission
- **Error Handling**: Shows error messages if subscription fails
- **Bot Protection**: Includes MailChimp's built-in bot protection
- **Debug Logging**: Console logs for troubleshooting (can be removed in production)

## How It Works

1. **Configuration Loading**: The template reads MailChimp settings from `_config.yml`
2. **Form Generation**: The form action URL and hidden fields are dynamically generated
3. **JavaScript Integration**: The newsletter script uses the configuration from the window object
4. **Form Submission**: Uses fetch API with `no-cors` mode for MailChimp compatibility
5. **Success Feedback**: Shows a Flowbite modal when subscription is successful

## Testing

1. **Build and serve your site**:

   ```bash
   hexo generate
   hexo server
   ```

2. **Navigate to a page with the newsletter section**

3. **Test the form**:

   - Enter a valid email address
   - Click Subscribe
   - You should see a success modal appear

4. **Check MailChimp**:

   - Log into your MailChimp account
   - Go to your Audience
   - Verify the email was added

5. **Check browser console**:
   - Open Developer Tools
   - Look for configuration and success logs

## Troubleshooting

### Common Issues

- **Modal not showing**: Ensure Flowbite JS is properly loaded
- **Form not submitting**: Check that your MailChimp credentials are correct in `_config.yml`
- **CORS errors**: The `no-cors` mode is required for MailChimp integration
- **Email not appearing in MailChimp**: Check your MailChimp audience settings and ensure the form action URL is correct
- **Configuration not loading**: Verify the `_config.yml` syntax is correct

### Debug Mode

The JavaScript includes console logging for debugging. To disable in production, remove the console.log statements from `source/scripts/newsletter.js`.

### Security Notes

- The API key is included in the client-side code for form submission
- This is standard practice for MailChimp embedded forms
- The API key only allows form submissions, not full API access
- Consider using environment variables for production deployments
