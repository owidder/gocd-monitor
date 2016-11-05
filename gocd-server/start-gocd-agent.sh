set -x
docker run  --name gocd-agent -ti --link gocd-server:go-server gocd/gocd-agent