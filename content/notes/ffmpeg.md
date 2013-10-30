#### extract audio from a video file to mp3
```sh
ffmpeg -i input.mp4 -vn -acodec libmp3lame -ac 2 -ab 160k -ar 44100 output.mp3
```
#### convert flv to mp3 with ffmpeg
```sh
ffmpeg -i input_flv.flv output_mp3.mp3
```
