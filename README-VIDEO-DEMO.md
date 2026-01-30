# Ferry Building Video Demo - Quick Instructions

## Generate Videos and See Them Live

### 1. Install & Setup (2 minutes)

```bash
npm install
export DASHSCOPE_API_KEY=sk-your-key-here
```

Get API key from https://dashscope.aliyun.com/

### 2. Generate Ferry Building Videos (15-20 minutes)

```bash
npm run generate-videos ferry-building
```

This creates 3 videos in `static/videos/`:
- `ferry-building-grand-opening.mp4` (1898)
- `ferry-building-freeway-era.mp4` (1959)
- `ferry-building-modern-renaissance.mp4` (2003)

### 3. View on Site

```bash
npm run dev
```

**Ferry Building Page:** http://localhost:5173/spot/ferry-building
- Videos auto-play and loop
- Click era cards to switch videos
- Falls back to prompt placeholder if video not generated

**Gallery View:** http://localhost:5173/gallery
- Shows all generated videos in grid
- Status badges show ready/generating/failed counts

## What You'll See

The Ferry Building page displays AI-generated historical footage:

**1898 Grand Opening** - Beaux-Arts terminal with ferries arriving, early cinema aesthetic with sepia tones and gentle flickering

**1959 Freeway Era** - Terminal obscured by elevated highway, grainy documentary style with desaturated colors

**2003 Modern Renaissance** - Renovated marketplace with farmers market, contemporary HD quality with vibrant colors

Each video is 5 seconds, 720p, loops seamlessly, and was generated from the detailed WAN prompts in `src/lib/data/spots.json`.

## Files to Check

**Generated videos:**
```bash
ls -lh static/videos/
```

**Metadata:**
```bash
cat src/lib/data/generated-videos.json
```

Look for entries with `"status": "ready"` - these videos will appear on the site.

## Troubleshooting

**Videos not showing?**
- Check metadata has `"status": "ready"` (not "generating" or "failed")
- Restart dev server: `npm run dev`
- Check browser console for errors

**Generation failed?**
- Verify API key: `echo $DASHSCOPE_API_KEY`
- Check DashScope account has credits
- Retry (it skips already-completed videos)

## Generate All Missing Videos (Sequential)

**Generate all remaining videos automatically:**

```bash
npm run generate-all
```

This will:
- Check which spots/eras are missing videos
- Generate all missing videos **one at a time** (to avoid rate limits)
- Skip videos that are already generated or currently generating
- Take about 7 minutes per video (~84 minutes for all 12 remaining videos)

## Generate Individual Spots

```bash
npm run generate-videos fishermans-wharf
npm run generate-videos chinatown
npm run generate-videos golden-gate-park
npm run generate-videos alcatraz
```

Each spot has 3 eras = 3 videos.

## More Info

- **QUICKSTART-VIDEO-GENERATION.md** - Detailed setup guide
- **docs/video-generation-guide.md** - Full technical documentation
- **docs/S-007-IMPLEMENTATION-SUMMARY.md** - Implementation details
