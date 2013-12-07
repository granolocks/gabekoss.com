#!/bin/bash
DOGE=100
for wow in $(seq 1 $DOGE); do
  such_file = 'doge_$wow'
  touch $such_file
  echo '---'                                                      >> $such_file
  echo 'title: Doge Images'                                       >> $such_file
  echo 'description: Wow. So doge. Very image.'                   >> $such_file
  echo 'source: http://gabekoss.com/images/doge/wow_so_image.jpg' >> $such_file
  echo 'description: Wow. So doge. Very image.'                   >> $such_file
  echo '---'                                                      >> $such_file
done

