set -x
idServer=`docker ps -aqf "name=gocd-server"`
docker cp passwd ${idServer}:/etc/passwd2
