#!/bin/bash

# Upload videos to Cloudflare R2 (remote)
# This script uploads all videos and enables public access

BUCKET_NAME="timelens-videos"

echo "🚀 Uploading videos to Cloudflare R2 (remote)..."
echo ""

# Upload all videos with --remote flag
cd static/videos
for video in *.mp4; do
  echo "📤 Uploading $video..."
  bunx wrangler r2 object put "$BUCKET_NAME/videos/$video" --file="$video" --remote
done
cd ../..

echo ""
echo "✅ Upload complete!"
echo ""
echo "🌐 Next: Enable public access in Cloudflare Dashboard:"
echo "   1. Go to https://dash.cloudflare.com/"
echo "   2. Navigate to R2 → timelens-videos"
echo "   3. Click 'Settings' → 'Public Access'"
echo "   4. Enable 'Allow Access' and copy the R2.dev URL"
echo "   5. Come back and provide the URL"
