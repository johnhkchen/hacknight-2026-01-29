# Quick Start: Generate Ferry Building Videos

This guide will get you generating AI videos for the Ferry Building in under 5 minutes.

## Setup (One Time)

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your DashScope API Key

Sign up at https://dashscope.aliyun.com/ and get an API key.

### 3. Set Environment Variable

```bash
export DASHSCOPE_API_KEY=sk-your-key-here
```

**Make it permanent** (optional):
```bash
echo 'export DASHSCOPE_API_KEY=sk-your-key-here' >> ~/.zshrc
source ~/.zshrc
```

## Generate Ferry Building Videos

Run the generation script:

```bash
npm run generate-videos ferry-building
```

This will:
- Generate 3 videos (1898, 1959, 2003 eras)
- Take about 15-20 minutes total
- Save videos to `static/videos/`
- Update `src/lib/data/generated-videos.json`

You'll see progress output like:

```
🚀 TimeLens Video Generation
============================

🎬 Generating videos for Ferry Building
   Location: The grand 1898 terminal that served as the city's...
   Eras to generate: 3

📝 [Grand Opening] Building enhanced prompt
   [Grand Opening] Submitting to WAN API...
   [Grand Opening] Generating video: RUNNING (attempt 5)
   ...
```

## View the Results

### Start the Dev Server

```bash
npm run dev
```

### Visit the Ferry Building Page

Navigate to: http://localhost:5173/spot/ferry-building

You should see:
- Videos playing automatically for each era
- Ability to switch between eras
- Videos loop seamlessly

### Or View the Gallery

Navigate to: http://localhost:5173/gallery

This shows all generated videos in a grid.

## What You Get

Three AI-generated videos showing the Ferry Building across time:

1. **Grand Opening (1898)** - Early cinema style, black and white
2. **Freeway Era (1959)** - Grainy documentary footage
3. **Modern Renaissance (2003)** - Contemporary HD video

Each video:
- 5 seconds long
- 1280x720 resolution (720p)
- Saved as `static/videos/ferry-building-{era-id}.mp4`

## Troubleshooting

**No API key error:**
```bash
export DASHSCOPE_API_KEY=your-key-here
```

**Videos not showing on page:**
- Check `src/lib/data/generated-videos.json` has entries with `"status": "ready"`
- Check files exist in `static/videos/`
- Restart dev server (`npm run dev`)

**Generation fails:**
- Check your API key is valid
- Check you have quota/credits in your DashScope account
- Retry the command (it will skip already-generated videos)

## Generate Other Spots

```bash
npm run generate-videos fishermans-wharf
npm run generate-videos chinatown
npm run generate-videos golden-gate-park
npm run generate-videos alcatraz
```

List all available spots:
```bash
npm run generate-videos
```

## Full Documentation

See `docs/video-generation-guide.md` for complete details on how the system works.
