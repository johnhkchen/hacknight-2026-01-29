# Video Generation Guide

This guide explains how to generate AI videos for TimeLens spots using Alibaba's WAN text-to-video API.

## Prerequisites

You need a DashScope API key from Alibaba Cloud to generate videos. The API uses the WAN 2.6 text-to-video model to create historical footage from prompts.

### Getting an API Key

1. Sign up at [DashScope](https://dashscope.aliyun.com/)
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key (it looks like `sk-...`)

## Quick Start: Generate Videos for Ferry Building

The Ferry Building is already configured with three eras spanning from its 1898 grand opening through today. This makes it perfect for a working demo.

### Step 1: Set Your API Key

Export your DashScope API key as an environment variable:

```bash
export DASHSCOPE_API_KEY=your-api-key-here
```

You can add this to your `~/.bashrc` or `~/.zshrc` to make it permanent.

### Step 2: Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
```

### Step 3: Generate Ferry Building Videos

Run the generation script for the Ferry Building:

```bash
npm run generate-videos ferry-building
```

This will:
1. Build enhanced prompts for each era (1898, 1959, 2003)
2. Submit video generation tasks to WAN API
3. Poll for completion (takes 5-15 minutes per video)
4. Download completed videos before URLs expire
5. Save to `static/videos/` with predictable filenames
6. Update metadata in `src/lib/data/generated-videos.json`

### Step 4: View the Results

Once generation completes, you can:

**View the gallery:**
```bash
npm run dev
# Navigate to http://localhost:5173/gallery
```

**Check generated files:**
```bash
ls -lh static/videos/
cat src/lib/data/generated-videos.json
```

**Play a video directly:**
```bash
open static/videos/ferry-building-grand-opening.mp4
```

## What Gets Generated

For the Ferry Building, you'll get three videos:

1. **Grand Opening (1898)**
   - File: `ferry-building-grand-opening.mp4`
   - Style: Early cinema, black and white, sepia tones
   - Shows the terminal in its Beaux-Arts glory with ferries arriving

2. **Freeway Era (1959)**
   - File: `ferry-building-freeway-era.mp4`
   - Style: Grainy documentary footage, desaturated colors
   - Shows the Embarcadero Freeway casting shadows

3. **Modern Renaissance (2003)**
   - File: `ferry-building-modern-renaissance.mp4`
   - Style: Contemporary HD video, natural colors
   - Shows the renovated marketplace with farmers market

## How It Works

The video generation pipeline has four stages:

### 1. Prompt Enhancement

The system takes the base `wanPrompt` from `spots.json` and enriches it with era-specific visual modifiers. Each era gets appropriate film style, color grading, and camera work based on its `yearStart` year.

For example, the 1898 Grand Opening prompt gets enhanced with early cinema aesthetics like "black and white, slight flicker, hand-cranked feel" while the 2003 Modern Renaissance gets "contemporary HD video, natural colors, smooth gimbal movement."

This happens in `src/lib/wanx/prompt-builder.ts` which maps year ranges to visual styles.

### 2. WAN API Submission

The enhanced prompt is submitted to DashScope's text-to-video endpoint using the WanxClient. The API returns a task ID and begins generating the video asynchronously.

Default parameters:
- Size: 1280x720 (720p)
- Duration: 5 seconds
- Prompt extension: enabled
- Shot type: single

### 3. Polling and Completion

The client polls the task status every 15 seconds (configurable). Status progresses from PENDING → RUNNING → SUCCEEDED. Maximum poll attempts is 40, giving about 10 minutes for generation.

When the task succeeds, the API returns a temporary video URL that expires in 24 hours.

### 4. Download and Storage

The video is downloaded via streaming to avoid loading the entire file into memory. It's saved to `static/videos/` with a filename like `{spot-id}-{era-id}.mp4`.

Metadata is tracked in `src/lib/data/generated-videos.json` with:
- Spot and era identifiers
- Enhanced prompt used
- Local file path
- Status (pending, generating, ready, failed)
- Timestamps
- Task ID for reference

## Generate for Other Spots

The script works for any spot in `spots.json`:

**Fisherman's Wharf (3 eras):**
```bash
npm run generate-videos fishermans-wharf
```

**Golden Gate Park (3 eras):**
```bash
npm run generate-videos golden-gate-park
```

**Chinatown (3 eras):**
```bash
npm run generate-videos chinatown
```

**Alcatraz Island (3 eras):**
```bash
npm run generate-videos alcatraz
```

**List all available spots:**
```bash
npm run generate-videos
```

## Troubleshooting

**"DASHSCOPE_API_KEY environment variable not set"**

Set your API key:
```bash
export DASHSCOPE_API_KEY=sk-your-key-here
```

**"Task failed" or "Task timed out"**

WAN generation can fail for various reasons including prompt issues, server load, or quota limits. Check the error message in the output. You can retry by running the script again - it will skip already-generated videos.

**"Response body is null" during download**

This happens if the download fails. The metadata will be marked as failed. Delete the failed entry from `generated-videos.json` and retry.

**Videos not showing in gallery**

Check that:
1. Metadata file has entries with `status: "ready"`
2. Video files exist in `static/videos/`
3. Dev server is running (`npm run dev`)
4. You're visiting `/gallery` not `/`

## API Costs

WAN video generation is a paid service. Check your DashScope account for pricing. Typical costs:
- Text-to-video (5 seconds, 720p): ~$0.05-0.10 per video
- Ferry Building (3 eras): ~$0.15-0.30 total

Generation time varies but typically takes 5-15 minutes per video depending on server load.

## Advanced Usage

### Custom Progress Tracking

The generation functions accept progress callbacks. See `scripts/generate-videos.ts` for an example that logs detailed progress.

### Batch Generation

To generate videos for all spots at once:

```typescript
import { generateAllEraVideos } from '$lib/wanx/video-storage';
import spotsData from '$lib/data/spots.json';

const apiKey = process.env.DASHSCOPE_API_KEY!;

for (const spot of spotsData.spots) {
  await generateAllEraVideos(spot, apiKey);
}
```

### Integration with UI

The video storage service can be called from SvelteKit server routes to build an admin interface for generation. Create a `src/routes/api/generate/+server.ts` endpoint that accepts spot and era IDs.

## File Structure

After running generation, your project will have:

```
static/
  videos/
    ferry-building-grand-opening.mp4
    ferry-building-freeway-era.mp4
    ferry-building-modern-renaissance.mp4

src/lib/data/
  generated-videos.json
```

The gallery component reads from `generated-videos.json` to know which videos are ready and displays them with their spot and era metadata.
