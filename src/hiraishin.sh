#!/bin/bash

export HIRAISHIN_SRC=/home/gust/projects/hiraishin/src

changeDirectory () {
    if [[ $1 == "-a" ]]; then
        shift
        node $HIRAISHIN_SRC/index.js -a "$@" 

    elif [[ $1 == "-r" ]]; then
        # shift
        # node $HIRAISHIN_SRC/index.js -r "$@" 
        echo Not implemented - WIP

    elif [[ $1 == "-w" ]]; then
        # shift
        # node $HIRAISHIN_SRC/index.js -w "$@" 
        echo Not implemented - WIP

    elif [[ $1 == "-p" ]]; then
        shift
        node $HIRAISHIN_SRC/index.js -p "$@" 

    elif [[ $1 == "-g" ]]; then
        shift
        node $HIRAISHIN_SRC/index.js -g "$@" 

    elif [[ $1 == "-fp" ]]; then
        shift
        node $HIRAISHIN_SRC/index.js -fp "$@" 

    else
        path="$(node $HIRAISHIN_SRC/index.js -f "$@")"
        cd "${path}"
    fi
}

alias h=changeDirectory
alias hiraishin=changeDirectory

