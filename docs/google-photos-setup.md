# Google Photos API Integration Setup Guide

This guide walks you through setting up Google Photos API to use authentic community photos in your Lembow platform.

## 🎯 Benefits of Google Photos Integration

- **Authentic Community Photos**: Use real photos from your community events and activities
- **Easy Management**: Community admins can upload photos directly to Google Photos albums
- **Automatic Sync**: Photos automatically appear in the app without manual uploads
- **High Quality**: Full resolution photos with automatic optimization
- **Cost Effective**: Use existing Google Photos storage instead of expensive CDN solutions

## 📋 Prerequisites

1. Google Cloud Platform account
2. Community Google Photos albums (shared albums work best)
3. Basic knowledge of environment variables

## 🚀 Step-by-Step Setup

### 1. Enable Google Photos Library API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** → **Library**
4. Search for "Photos Library API"
5. Click **Enable**

### 2. Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **API Key**
3. Copy the generated API key
4. (Optional) Restrict the key to Photos Library API for security

### 3. Set Up Community Albums

#### Option A: Shared Albums (Recommended)
1. Create shared albums in Google Photos for each community
2. Name them clearly (e.g., "Igbo Cardiff Community Events")
3. Get album IDs from the URL when viewing the album
4. Album URL format: `https://photos.google.com/share/[ALBUM_ID]`

#### Option B: Public Albums
1. Make albums publicly visible (less secure)
2. Share album links with view permissions

### 4. Configure Environment Variables

Create `.env.local` file in your `apps/web` directory:

```bash
# Google Photos API Configuration
NEXT_PUBLIC_GOOGLE_PHOTOS_API_KEY=your_actual_api_key_here

# Community Album IDs (get from album URLs)
NEXT_PUBLIC_IGBO_CARDIFF_ALBUM_ID=actual_album_id_for_igbo_cardiff
NEXT_PUBLIC_NIGERIAN_LONDON_ALBUM_ID=actual_album_id_for_nigerian_london
NEXT_PUBLIC_GHANAIAN_MANCHESTER_ALBUM_ID=actual_album_id_for_ghanaian_manchester

# Fallback album for communities without specific albums
NEXT_PUBLIC_FALLBACK_ALBUM_ID=general_community_album_id
```

### 5. Test the Integration

1. Restart your development server: `pnpm dev`
2. Visit a community page: `http://localhost:3000/c/igbo-cardiff`
3. Check browser console for any API errors
4. Verify photos load from Google Photos (may take a moment)

## 🔧 Code Integration Examples

### Basic Usage (Already Implemented)
```typescript
import { getCommunityCoverPhoto } from '../lib/photos'

// Synchronous fallback
const photoUrl = getCommunityCoverPhoto('igbo-cardiff')

// Async with Google Photos
const photoUrl = await getCommunityCoverPhotoAsync('igbo-cardiff')
```

### React Hook Usage
```typescript
import { useCommunityPhoto } from '../lib/useCommunityPhoto'

function CommunityHero({ slug }) {
  const { photoUrl, loading, error } = useCommunityPhoto(slug)
  
  return (
    <img src={photoUrl} alt="Community" />
  )
}
```

## 📱 Album Management Best Practices

### For Community Admins:
1. **Organize by Event Type**: Create folders/albums for different event types
2. **Use Descriptive Names**: "Cultural Night 2024", "New Year Service 2025"
3. **High Quality Photos**: Upload original quality images
4. **Regular Updates**: Add new photos after events

### For Developers:
1. **Cache Photos**: API responses are cached for 1 hour
2. **Fallback Strategy**: Always provide stock photo fallbacks
3. **Error Handling**: Graceful degradation when API fails
4. **Rate Limiting**: Respect Google Photos API rate limits

## 🚨 Troubleshooting

### Common Issues:

**Photos Not Loading**
- Check API key validity
- Verify album IDs are correct
- Ensure albums are accessible
- Check browser console for errors

**API Quota Exceeded**
- Check Google Cloud Console quotas
- Implement request caching
- Reduce API call frequency

**Album Access Denied**
- Verify album sharing permissions
- Check if albums are public or properly shared
- Ensure API key has necessary permissions

### Debug Commands:
```bash
# Check environment variables
echo $NEXT_PUBLIC_GOOGLE_PHOTOS_API_KEY

# Test API directly
curl "https://photoslibrary.googleapis.com/v1/albums" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 💰 Cost Considerations

- Google Photos Library API: **Free** up to quotas
- Daily quota: 10,000 requests per day (generous for most communities)
- No storage costs (uses existing Google Photos storage)
- Production scaling may require quota increases

## 🔐 Security Notes

1. **Restrict API Keys**: Limit to Photos Library API only
2. **Environment Variables**: Never commit API keys to version control
3. **Album Permissions**: Use shared albums instead of making everything public
4. **Rate Limiting**: Implement client-side caching to avoid quota issues

## 🎯 Next Steps

1. Set up your first community album
2. Configure API credentials
3. Test with one community
4. Scale to all communities
5. Train community admins on photo management

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google Photos API documentation
3. Check our project issues on GitHub
4. Contact the development team

---

**Ready to get authentic community photos in your app? Follow this guide and your communities will love seeing real photos of their events and activities!** 📸✨