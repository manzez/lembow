# Google Places API Setup Guide for Lembow Communities

This guide helps you set up Google Places API for location features in your community platform.

## 🎯 What You'll Get

- **Smart Location Search**: Autocomplete for event venues and community addresses
- **Address Validation**: Ensure accurate location data
- **Maps Integration**: Show event locations on interactive maps
- **Venue Discovery**: Find suitable venues near communities
- **Geocoding**: Convert addresses to coordinates for mapping

## 📋 Prerequisites

- Google account
- Credit/debit card for billing setup (has generous free tier)
- 10 minutes for setup

## 🚀 Step-by-Step Setup

### 1. **Create Google Cloud Project**

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "NEW PROJECT"
3. Project name: "Lembow Community Platform"
4. Click "CREATE"

### 2. **Enable Required APIs**

Go to **APIs & Services** → **Library** and enable these:

✅ **Places API** - Location search and details  
✅ **Maps JavaScript API** - Interactive maps  
✅ **Geocoding API** - Address to coordinates conversion  
✅ **Places API (New)** - Enhanced location features  

### 3. **Set Up Billing** ⚠️ Required

1. Go to **Billing** in the sidebar
2. Click "Link a billing account"
3. Add payment method

**💰 Cost Breakdown:**
- **FREE TIER**: $200/month credit (covers ~40,000 API requests)
- **Places API**: $17 per 1,000 requests after free tier
- **Maps API**: $7 per 1,000 loads after 28,000 free loads/month
- **Most communities won't exceed free tier**

### 4. **Create API Key**

1. Go to **APIs & Services** → **Credentials**
2. Click "**+ CREATE CREDENTIALS**" → "**API key**"
3. **Copy the key immediately** (you'll need it)

### 5. **Secure Your API Key** 🔐 Important!

1. Click on your API key name to edit
2. **Application restrictions**:
   - Choose "HTTP referrers (web sites)"
   - Add these URLs:
     ```
     localhost:3000/*
     *.yourdomain.com/*
     ```
3. **API restrictions**:
   - Select "Restrict key"
   - Choose only the APIs you enabled above

### 6. **Add to Environment Variables**

Create `.env.local` in your `apps/web` folder:

```bash
# Google Places & Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here

# Optional: Set usage limits to control costs
NEXT_PUBLIC_PLACES_API_DAILY_LIMIT=1000
```

### 7. **Test Your Setup**

Test your API key with this URL (replace YOUR_KEY):
```
https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=London&inputtype=textquery&key=YOUR_KEY
```

Should return JSON data about London.

## 🔧 Integration Examples

### Basic Location Search
```typescript
import { LocationSearchInput } from '../lib/useLocationSearch'

function EventForm() {
  const handleLocationSelect = (location) => {
    console.log('Selected:', location.description)
  }

  return (
    <LocationSearchInput
      placeholder="Where is your event?"
      onLocationSelect={handleLocationSelect}
      types={['establishment']} // Venues only
    />
  )
}
```

### Community Address Validation
```typescript
import { geocodeEventAddress } from '../lib/googlePlaces'

async function validateCommunityAddress(address: string) {
  const result = await geocodeEventAddress(address)
  if (result) {
    console.log('Valid address:', result.formatted_address)
    console.log('Coordinates:', result.lat, result.lng)
  }
}
```

## 📱 Usage in Lembow Features

### 1. **Event Creation**
- Search for venue names: "Cardiff Community Centre"
- Auto-complete addresses
- Validate locations exist

### 2. **Community Setup**
- Verify community addresses
- Get accurate coordinates for mapping
- Standardize location format

### 3. **Event Discovery**
- "Events near me" functionality
- Distance-based event filtering
- Map view of community events

### 4. **Member Experience**
- Easy location input in forms
- Professional address formatting
- Reduced typing errors

## 🚨 Troubleshooting

### **API Key Not Working**
```bash
# Check your key:
curl "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Cardiff&inputtype=textquery&key=YOUR_KEY"
```

Common issues:
- Key not properly restricted
- APIs not enabled
- Billing not set up
- Wrong environment variable name

### **Quota Exceeded**
- Check Google Cloud Console → APIs & Services → Quotas
- Monitor usage in Billing dashboard
- Implement caching to reduce API calls

### **CORS Errors**
- Ensure HTTP referrer restrictions include your domain
- Check if running on correct port (3000)

## 💡 Cost Optimization Tips

1. **Cache Results**: Store frequent searches locally
2. **Debounce Searches**: Wait 300ms between keystrokes  
3. **Limit Results**: Request only 5-10 suggestions
4. **Use Fallbacks**: UK cities list when API unavailable
5. **Monitor Usage**: Set up billing alerts

## 🎯 Free Tier Usage Estimates

**For a community with 500 members:**
- Event location searches: ~200/month
- Address validations: ~50/month
- Map loads: ~1,000/month
- **Total cost**: FREE (well under limits)

## 🔐 Security Best Practices

1. **Restrict API Keys**: Never use unrestricted keys
2. **Environment Variables**: Never commit keys to git
3. **Domain Restrictions**: Limit to your specific domains
4. **Monitor Usage**: Set up alerts for unusual activity
5. **Rotate Keys**: Change keys periodically

## 📞 Support Resources

- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
- [Google Cloud Support](https://cloud.google.com/support/)

## ✅ Verification Checklist

Before going live:
- [ ] API key created and restricted
- [ ] Billing account set up
- [ ] All required APIs enabled
- [ ] Environment variables configured
- [ ] Test API call successful
- [ ] Usage monitoring configured

---

**🎉 Once setup is complete, your communities will have professional location features that make event planning and discovery much easier!**

Need help? The development team can assist with setup during your onboarding call.