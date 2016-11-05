set -x
idAgent=`docker ps -aqf "name=gocd-agent"`
docker kill ${idAgent}
docker rm ${idAgent}
