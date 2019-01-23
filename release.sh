#! /bin/bash

rm -rf public/*
npm run build

version=$(git describe --tags)
tar -cvzf versions/$version.tar.gz public

scp versions/$version.tar.gz vps:~/websites/release.tar.gz

ssh vps <<'ENDSSH'
    tar -xf ~/websites/release.tar.gz -C ~/websites/
    rm -rf ~/websites/blog && mv ~/websites/public ~/websites/blog
    rm ~/websites/release.tar.gz
ENDSSH