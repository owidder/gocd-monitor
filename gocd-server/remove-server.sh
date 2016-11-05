set -x
idServer=`docker ps -aqf "name=gocd-server"`
docker kill ${idServer}
docker rm ${idServer}
