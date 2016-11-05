set -x
idServer=`docker ps -aqf "name=gocd-server"`
docker exec -it ${idServer} /bin/bash
