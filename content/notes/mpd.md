#  Music Player Daemon

Source: http://crunchbang.org/forums/viewtopic.php?id=17386

## Install

```sh
sudo apt-get install mpd
sudo apt-get install mpc
```

## Set up as User Service

``sh
sudo service mpd stop
sudo update-rc.d mpd disable
```

## Configure MPD

```sh
mkdir -p ~/.mpd/playlists
touch ~/.mpd/{mpd.db,mpd.log,mpd.pid,mpdstate}
gunzip -c /usr/share/doc/mpd/examples/mpd.conf.gz > ~/.mpd/mpd.conf
~/.mpd/mpd.conf
```

Edit ` ~/.mpd/mpd.conf` with:

```
music_directory    "/home/garion/music"
playlist_directory "/home/garion/.mpd/playlists"
db_file            "/home/garion/.mpd/tag_cache"
log_file           "/home/garion/.mpd/mpd.log"
pid_file           "/home/garion/.mpd/mpd.pid"
state_file         "/home/garion/.mpd/mpdstate"


#user                "mpd"

audio_output {
    type        "alsa"
    name        "My ALSA Device"
    device        "hw:0,0"    # optional
    format        "44100:16:2"    # optional
    mixer_device    "default"    # optional
    mixer_control    "PCM"        # optional
    mixer_index    "0"        # optional
}

```
