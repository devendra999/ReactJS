#!/bin/bash
echo "its next-ui"
docker build . -t next-ui
docker rm -f next-ui
docker run -d -p 3000:3000 --name next-ui  --restart unless-stopped next-ui