set -x
idServer=`docker ps -aqf "name=gocd-data"`
docker cp passwd ${idServer}:/etc/passwd2
