---
title: ffmpeg
updated_at: 2013-11-07 06:59
---


`ffmpeg` is a tool to help in processing of various media files. I mostly use
it to extract audio from video files. 

#### Convert mp4 video file to mp3

```bash
ffmpeg -i input.mp4 -vn -acodec libmp3lame -ac 2 -ab 160k -ar 44100 output.mp3
```

#### Convert flv to mp3 with ffmpeg

```bash
ffmpeg -i input_flv.flv output_mp3.mp3
```
