set -x
docker run  --name gocd-server -p 8153:8153 -p 8154:8154 --volumes-from gocd-data -tiP gocd/gocd-server