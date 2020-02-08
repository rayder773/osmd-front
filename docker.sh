#!/bin/bash

# kill old container
docker stop osmd_admin_5001
docker rm osmd_admin_5001
docker rmi osmd_admin -f

# build new container
docker build -t osmd_admin .
docker run -id --name osmd_admin_5001 -p 5001:5000 osmd_admin