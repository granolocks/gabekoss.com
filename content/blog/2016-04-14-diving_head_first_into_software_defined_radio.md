---
title: Diving Head-first into Software Defined Radio
created_at: 2016-04-14 14:58
updated_at: 2016-04-14 14:58
kind: blog-post
author: Gabe Koss
summary: I spent some time recently for my job studying software defined radio and these are some of my notes and takeaways.  
tags: 
- research
- python
- sdr
- software defined radio
- gnuradio
- gqrx
- modulation
- keeloq
--- 

I don't have a traditional computer science background and this has rarely felt
like any sort of hindrance or limitation. Usually the gaps show up most clearly
as I delve closer and closer to Layer 1 -- the physical Layer. This is the
space where electrons and bits become more fluid and the physical world begins
to  blend with the digital. 

Over the years I have done quite a bit of research into the lower level
operations of a computer. One of the best books on the subject I have read was
[Code](http://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319)
by Charles Petzoid. This book does an incredible job of explaining the
development of electronic signaling and binary math. I remember when I first
read it I felt like a constellation of dots were being connected for me.  

When I first dipped my toe into the SDR waters and saw the signals I knew were
there represented in such a beautiful and compelling way I (re)discovered a 
strong desire to know more, even if just for the pure awareness of the world 
around me. 

This post can't possibly synthesize all that I tried, failed or learned over
the last week or so of SDR research but I just want to summarize some of my
notes and thoughts on the subject as much for myself to return to later on as 
anything else. 

## What is Software Defined Radio?  

Software Defined Radio or SDR basically boils down to using digital mechanisms
to control, inspect and process radio frequencies. Traditionally this would be
done with analog controls such as knobs or dials that adjusted the physical
relationships within the radio itself. 

SDR is incredibly powerful because it empowers amateur researchers to
investigate and create complex digital radio systems or inspect the signals
around them at a fraction of the cost of traditional analog gear. It is also
capable of covering a much wider spectrum of the radio and tuning it incredibly
precise way all within the computer itself.

Additionally, because the SDR does the job of bringing the signal into the
computer in a programatically accessible way this is ideal for writing code
that generates or consumes radio waves.

An SDR card itself is basically a sound card where the out audio I/O is
replaced with antennas and (in this case) a USB cable to manage the device and
extract the data back to the host computer.

## Hardware

For the research from which these notes are derived I primarily used two
different SDRs

### HackRF Jawbreaker
HackRF Jawbreaker is an older SDR board which has been replaced by the popular
[HackRF One](https://greatscottgadgets.com/hackrf/). Even being out of date
this board was still capable of operating from 1 MHz to 6 GHz and therefore
allowed me to look at most of the spaces of radio bandwidth which I was
interested in inspecting.  

<img src="/images/sdr/hackrf_jawbreaker.png" style="width:100%;" />

### Realtek SDR DVB-T+DAB+FM

This Realtek card is pretty Ubiquitous in the SDR world as an entry point card.
Supporting the Realtek SDR drivers it is easy to get running on many different
systems .

The Frequency Range is ~24MHz-1.7GHz and so not nearly as as wide as the HackRF
nor the processor as powerful. This means that where I was able to get large
Sample Rates of up to 20 Million Samples on the Hack RF I was only able to use
this card 

This card or an equivalent can usually be picked up for about $20-$40 and so
there is almost no barrier of entry for someone (like me) who is curious about
getting started with SDR. 

<img src="/images/sdr/rtl_sdr_dvbt_dab_fm.png" style="width:100%;" />

## Software

### rtl_sdr

`rtl_sdr` is the package which includes the drivers for the Realtek SDR cards.
Once installed other tools like `gqrx` and `gnuradio` will be able to use the
RTL SDR source. 

I did most of this exploration on an Ubuntu system and Instructables has a [nice
guide](http://www.instructables.com/id/rtl-sdr-on-Ubuntu/) to getting this 
working on Ubuntu. In addition to running `sudo apt-get install rtl_sdr` I 
added a UDEV rule to my system to make the device appear in `/dev/` when i 
plugged it in. 

First I plugged in the DVB-T+DAB+FM and ran `lsusb | grep Realtek`. This 
returned the following output:

```
Bus 001 Device 008: ID 0bda:2838 Realtek Semiconductor Corp.
```

Using the information provided here and following the Instructables guide I 
added a file at `/etc/udev/rules.d/20.rtlsdr.rules` that contains the 
following line:

```
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bda", ATTRS{idProduct}=="2838", GROUP="adm", MODE="0666", SYMLINK+="rtl_sdr"
```

After this line was added I was able to replug in the adapter and see the 
following:

```
$ ls /dev/ | grep rtl
rtl_sdr
```

### gqrx

`gqrx` is a spectrum analyzer tool for SDR devices and replay sources. It
offers a high degree of tuning and recording capabilities as well as providing
a wonderful and beautiful way to explore the signal with the provided FFT and
Waterfall graphs. 

By way of illustration this sreenshot shows `gqrx` tuned to a local FM station. 

<img src="/images/sdr/gqrx_989_fm.png" style="width:100%;" />

### gnuradio

`gnuradio` is an SDR meta-programming frame work which allows a savvy user to
create complex flow graph diagrams to represent control over an electrical
signal and then transpile them into Python scripts which can create GUIs,
demodulate signals,  capture or replay or simply tune and listen to various
radio signals in the area. 

`gnuradio` is most typically seen in its GUI form which is called
`gnuradio-companion` (GRC). Here is a screenshot from GRC showing the flowgraph
I made to tune the HackRF to two FM radio stations at the same time. This was
totally based on the one of the Great Scott Gadgets tutorials but is a nice
illustration of the tool and how it works.  The `Top Block` window you can see
was the UI generated by flow chart controlling the card and the actual flow of 
the signal. 

<img src="/images/sdr/gnu_radio_double_fm.png" style="width:100%;" />


In general `gnuradio` can be thought to operate on a few fundamental types. 

#### Sources
Sources which are the source of a flow of signal. This could be an SDR device,
a recorded flow from another device, output from a sound card or just a
generated waveform. The Osmocom Source block hooked into the HackRF and the
RTL-SDR Source block provided data from the RTL SDR card. 

#### Operators

I am not sure what the technical term for the block that lay between the Source
and Sink blocks but there are a huge variety of built in blocks which can
operate or combine the flows coming out of the sources for purposes such as
filtering, amplifying, aliasing and many other things. 

To be honest I am barely starting to scratch the surface of what is available
here. 

#### Sinks
Sinks are endpoints for the flow. These can be things like audio sinks (sound
card output) or file captures as well as the graphical component of the
generated GUIs. Perhaps most interestingly sinks can be TX hardware so that the
processed signal is (re)transmitted.

Like `gqrx`, GRC also supports some graphical outputs such as the classic
Waterfall and FFT graphs. Unfortunately because GRC is doing a lot of its GUI
processing under the hood in Python it is much more sluggish and less pretty
than gqrx. 

That being said I was able to use the Scope sink to clearly see the signal
present in some AM demodulated waves off a keyless car entry remote. 

<img src="/images/sdr/gnuradio_magnitude_values.png" style="width:100%;" />

### rtl_433

[rtl_433](https://github.com/merbanan/rtl_433) is a cool library built on top
of the `rtl_sdr` packages which is designed to scan the common 433MHz band for
things like Heat Sensors and other interesting radio broadcasting appliances. 

I did not do a deep dive on the tool but ran it with the simplest default flags 
like `rtl_433 -a`.  This resulted in an interesting stream of signals on this 
band such as: 

```
p_limit: 110
bitbuffer:: Number of rows: 14 
[00] {0} : 
[01] {0} : 
[02] {42} 31 80 91 40 16 80 : 00110001 10000000 10010001 01000000 00010110 10
[03] {0} : 
[04] {42} 31 80 91 40 16 80 : 00110001 10000000 10010001 01000000 00010110 10
[05] {0} : 
[06] {42} 31 80 91 40 16 80 : 00110001 10000000 10010001 01000000 00010110 10
[07] {0} : 
[08] {42} 31 80 91 40 16 80 : 00110001 10000000 10010001 01000000 00010110 10
[09] {0} : 
[10] {42} 31 80 91 40 16 80 : 00110001 10000000 10010001 01000000 00010110 10
[11] {0} : 
[12] {42} 31 80 91 40 16 80 : 00110001 10000000 10010001 01000000 00010110 10
[13] {0} : 
*** signal_start = 81154498, signal_end = 81174503
signal_len = 20005,  pulses = 1
Distance coding: Pulse length 4
```

That particular signal repeated quite often with some slight variations but it
doesnt look like the format was immediately recognized as a signature,
nevertheless the structure of the packets is pretty clear and so I suspect with
a bit more research I could figure out what in my neighborhood is broadcasting
this.

I also played with tuning `rtl_433` to the 315MHz bands to see if it could
gimme a freebie and decode the Car Lock Remote I was experimenting with. It
definitely saw the signal as signal when I pressed the lock or unlock button
but this info was inconsistent and seemed to be demodulated incorrectly.  Here
are some samples bursts of data. To do this I used the command `rtl_433 -f
315000000 -s 2000000 -a -q`. 

*Note: these are not in the sequence the appeared but were cherry picked out of
the output to show interesting variants of how `rtl_433` saw these completely
different packets.*

```
p_limit: 709
bitbuffer:: Number of rows: 2 
[00] {1} 00 : 0
[01] {640} 08 20 00 ca 9a 94 26 68 89 0a 96 81 1f 7f ba df bf 67 7f fe fe 9f fb c1 00 0c 49 54 4c 54 c4 40 90 8c 8e 0b fc bf fb 3e ff df 7f 7b 2f d7 fc 08 01 89 55 43 13 54 24 49 ad 03 ed ff d7 7b fe d3 67 ff d5 3b fd d0 10 00 ca b2 4c 26 a9 21 16 b8 
*** signal_start = 46231505, signal_end = 46251509
signal_len = 20004,  pulses = 1
Distance coding: Pulse length 3

Short distance: 1000000, long distance: 0, packet distance: 0

p_limit: 700
bitbuffer:: Number of rows: 2 
[00] {1} 00 : 0
[01] {640} 04 08 00 30 91 35 31 20 87 5d 2d 17 fb f7 ff f6 b6 ba dd de f6 f7 fb d8 04 01 8a 4d 4c 44 10 aa e8 bb 5f df 7f dd ff ff fe f6 df ff be 04 00 0c 25 6a 30 50 47 4b 4b b5 3b ff 7e cf f6 fb ea fb 3f 5f fb d6 04 00 18 a5 92 60 a0 8e ac ae ef 7f 
*** signal_start = 48684012, signal_end = 48741137
signal_len = 57125,  pulses = 2
Iteration 1. t: 2    min: 0 (0)    max: 5 (2)    delta 8
Iteration 2. t: 2    min: 0 (0)    max: 5 (2)    delta 0
Distance coding: Pulse length 2

Short distance: 37119, long distance: 0, packet distance: 37119

p_limit: 710
bitbuffer:: Number of rows: 5 
[00] {7} 02 : 0000001
[01] {189} 00 80 02 92 4d 43 08 02 75 c8 80 cb df ff bf fe f6 52 e3 fb ed 7f 56 b8 
[02] {174} 02 00 29 25 8a 31 00 27 5c 48 73 3f bf 5d 73 ff ff ff fb 5f d7 7c 
[03] {179} 04 00 62 96 90 c2 00 9d 39 20 ef fd 7d e9 76 fc bf f5 7f af ea fd 60 
[04] {174} 04 00 60 ab 50 c1 00 4e b8 41 03 bf eb ff fd ef 7f ae e7 fd ff f8 
*** signal_start = 53032964, signal_end = 53052967
signal_len = 20003,  pulses = 1
Distance coding: Pulse length 2

p_limit: 702
bitbuffer:: Number of rows: 5 
[00] {6} 04 : 000001
[01] {183} 02 00 18 90 b4 46 22 d2 a1 01 d0 43 ff c6 ff bf ff 7f bd f7 df af f8 
[02] {182} 01 00 62 25 52 51 5d 28 20 2d 10 de df bf 9b fd e6 fd ff fe 95 fb bc 
[03] {182} 02 00 19 49 94 c5 6a a1 03 90 42 df da fb 9d 7d fa ff ff b7 f6 d7 6c 
[04] {183} 00 80 18 4a d4 a1 6a 24 82 02 d2 3f 7f 75 ff 77 ff 77 df d5 af fc 6c 
*** signal_start = 54876763, signal_end = 54970578
signal_len = 93815,  pulses = 3
Iteration 1. t: 3    min: 0 (0)    max: 7 (3)    delta 20
Iteration 2. t: 2    min: 2 (2)    max: 3 (1)    delta 20
Iteration 3. t: 3    min: 0 (0)    max: 7 (3)    delta 20
Iteration 4. t: 2    min: 2 (2)    max: 3 (1)    delta 20
Iteration 5. t: 3    min: 0 (0)    max: 7 (3)    delta 20
Iteration 6. t: 2    min: 2 (2)    max: 3 (1)    delta 20
Iteration 7. t: 3    min: 0 (0)    max: 7 (3)    delta 20
Iteration 8. t: 2    min: 2 (2)    max: 3 (1)    delta 20
Iteration 9. t: 3    min: 0 (0)    max: 7 (3)    delta 20
Distance coding: Pulse length 3

Short distance: 32228, long distance: 0, packet distance: 36903
```

### Other resources

* [SDR with HackRF Tutorials](https://greatscottgadgets.com/sdr/): Hands down 
  these tutorials from Great Scott Gadgets were the most valuable resource I 
  have come across. Michael Ossmann's teaches with an extraordinarily clear 
  style and really helps guide the students understanding holistically. I will
  be revisiting these for quite some time.
* [Discrete Fourier Transorm Demo](http://madebyevan.com/dft/): a useful site
  to help understand how the samples displayed on FFT Charts are generated. 
* [All About Decibels](http://gnuradio.org/redmine/projects/gnuradio/wiki/AllAboutDecibels):
  a helpful guide to understanding Decibels, what they are and how they work. 
* [Amateur Signals Intelligence](http://hackaday.com/2014/07/24/a-lesson-in-blind-reverse-engineering-signals-intelligence/): a really nice breakdown of someone looking at similar types of data with `gqrx`.
* [FCC ID Lookup](https://fccid.io/): search for FCC device registration 
  information by searching the FCC ID found on most radio devices. 
* [Pentoo Linux](http://www.pentoo.ch/): Pentoo is a pentesting distro based on
  Gentoo linux. I mention it here because it is highly compatible with Wireless
  hacking tools and also because many of the tutorials on Great Scott Gadgets
  are created on Pentoo.
* [sdr.ninja Tutorials](http://sdr.ninja/training-events/sdr-wctf/): the kind 
  folks over at sdr.ninja have some neat guides and tutorials. 
