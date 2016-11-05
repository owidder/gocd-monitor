set -x
idServer=`docker ps -aqf "name=gocd-agent"`
docker exec -it ${idServer} /bin/bash
