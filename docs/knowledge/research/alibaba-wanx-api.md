# Alibaba Cloud Wanx Video Generation API Research

This document covers the DashScope API for Alibaba Cloud's Wanx video generation models, which includes text-to-video, image-to-video, and reference-to-video capabilities.

## API Overview

The DashScope API provides asynchronous video generation through a two-step process where you first submit a generation task and then poll for results. All video generation models share the same base endpoint structure but differ in their input requirements and supported parameters.

### Regional Endpoints

Three regional deployments exist with separate API keys that cannot be used interchangeably. The Singapore endpoint at `https://dashscope-intl.aliyuncs.com/api/v1` serves international users, Virginia at `https://dashscope-us.aliyuncs.com/api/v1` serves US users, and Beijing at `https://dashscope.aliyuncs.com/api/v1` serves China users. For this project we'll use the international Singapore endpoint since our API key is configured for that region.

### Authentication

All requests require a Bearer token in the Authorization header formatted as `Authorization: Bearer $DASHSCOPE_API_KEY`. HTTP requests also require the `X-DashScope-Async: enable` header to trigger asynchronous processing.

## Available Models

### wan2.6-t2v (Text-to-Video)

This is the primary text-to-video model that generates cinematic videos from text prompts with optional audio. It supports resolutions from 480P to 1080P, durations from 2-15 seconds at 30fps, and can generate multi-shot narratives with synchronized audio. The model automatically generates background music or allows custom audio input via URL.

Key parameters include `prompt` for the scene description up to 1500 characters, `size` for resolution like "1280*720", `duration` for length in seconds, `prompt_extend` to enable LLM-based prompt enhancement, and `shot_type` which can be "single" or "multi" for multi-shot storytelling.

### wan2.6-i2v (Image-to-Video)

The standard image-to-video model takes an initial frame image and animates it based on a text prompt. It supports the same resolution and duration options as text-to-video and maintains visual consistency with the input image throughout the generated video.

### wan2.6-i2v-flash

A faster variant of image-to-video optimized for quicker generation times with slightly reduced quality. Good for iterating on concepts before committing to full-quality renders.

### wan2.6-r2v (Reference-to-Video)

This model maintains character consistency across generated videos by extracting appearance and voice from 1-3 reference videos. Each reference video should contain only one character. The model preserves face, clothing, colors, lighting, camera angles, and background characteristics from the references.

### wan2.6-image (Text-to-Image)

While not video, this model generates images from text prompts and can be useful for creating initial frames for image-to-video workflows. It supports resolutions between 768x768 and 1280x1280 pixels with various aspect ratios.

### wan2.6-t2i (Text-to-Image)

An alias or variant of the image generation model, functionally equivalent to wan2.6-image for text-to-image generation purposes.

## API Workflow

### Step 1: Submit Generation Task

Send a POST request to create an async task. For video generation the endpoint is `/services/aigc/video-generation/video-synthesis`.

```bash
curl 'https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis' \
  -H 'X-DashScope-Async: enable' \
  -H 'Authorization: Bearer $DASHSCOPE_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "wan2.6-t2v",
    "input": {
      "prompt": "A serene mountain landscape at sunrise with mist rolling through valleys"
    },
    "parameters": {
      "size": "1280*720",
      "duration": 5
    }
  }'
```

The response contains a `task_id` and initial status of "PENDING":

```json
{
  "output": {
    "task_status": "PENDING",
    "task_id": "abc123-task-id"
  },
  "request_id": "request-id-here"
}
```

### Step 2: Poll for Results

Query the task status using GET with the task ID. Poll every 15-30 seconds until status changes to "SUCCEEDED" or "FAILED".

```bash
curl 'https://dashscope-intl.aliyuncs.com/api/v1/tasks/abc123-task-id' \
  -H 'Authorization: Bearer $DASHSCOPE_API_KEY'
```

Task statuses progress through PENDING, RUNNING, and finally SUCCEEDED or FAILED. A successful completion returns the video URL:

```json
{
  "output": {
    "task_status": "SUCCEEDED",
    "task_id": "abc123-task-id",
    "video_url": "https://dashscope-result.oss.aliyuncs.com/video.mp4"
  },
  "usage": {
    "duration": 5,
    "output_video_duration": 5
  }
}
```

## Important Constraints

Video URLs and task IDs expire after 24 hours, so results must be downloaded promptly. Billing occurs only on successful generation based on output video duration. Processing typically takes 1-5 minutes depending on resolution and duration.

For audio input, files must be WAV or MP3 format between 3-30 seconds and under 15MB. Longer audio gets truncated to match video duration.

## Resolution Options

Text-to-video supports these size values:
- 480P: "848*480", "624*624", "480*848"
- 720P: "1280*720", "960*960", "720*1280"
- 1080P: "1920*1080", "1440*1440", "1080*1920"

Image-to-video uses a `resolution` parameter with values "480P", "720P", or "1080P".

## Sources

- [Alibaba Cloud Text-to-Video API Reference](https://www.alibabacloud.com/help/en/model-studio/text-to-video-api-reference)
- [Alibaba Cloud Image-to-Video API Reference](https://www.alibabacloud.com/help/en/model-studio/image-to-video-api-reference)
- [Alibaba Cloud Video Generation Overview](https://www.alibabacloud.com/help/en/model-studio/use-video-generation/)
- [Alibaba Cloud Image Generation API Reference](https://www.alibabacloud.com/help/en/model-studio/wan-image-generation-api-reference)
