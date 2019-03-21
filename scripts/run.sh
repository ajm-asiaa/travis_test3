#!/bin/bash
  
dirname=`dirname $0`

## Check if log directory exists and if not, create it.
if [ ! -d $HOME/CARTA/log ]; then
        mkdir -p $HOME/CARTA/log
        touch $HOME/CARTA/log/carta.log
fi

logfilename=$HOME/CARTA/log/$(date +"%Y%m%d_%H%M%S_%Z").log

## Keep only the latest 5 log files
ls -C1 -t ~/CARTA/log/* | awk 'NR>5' | xargs rm

## source the measures data
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )/../etc"

export CASAPATH="../../../../$DIR linux"

## Handle the possible user argument combinations
if [ "$1" = "" ]; then
 echo "case0"
 folder=$HOME
elif [ $1 = "." ] && [ "$2" = ""  ] && [ "$3" = ""  ]; then
 echo "case1"
 folder=$PWD
elif [ -n "$1" ] && [ $1 != "" ] && [ $1 != "." ] && [ "$2" = "" ] && [ "$3" = "" ]; then
 echo "case2"
 folder=$1
fi

if [ ! -d "$folder" ]; then
 echo "$folder does not exist. Defaulting to $HOME" 
 folder=$HOME
fi

$dirname/carta_backend port=5555 base=$folder threads=16 >> $logfilename 2>&1
