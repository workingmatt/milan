pm2 stop all
pm2 kill
redis-2.8.3/src/redis-cli shutdown

./redis-2.8.3/src/redis-server &
pm2 start server.js -i max

ifconfig eth0 | grep '\<inet\>' | cut -d: -f2 | cut -d' ' -f1

