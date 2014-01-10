Second Screen application for live events.

Display images in a grid in a browser on any device. Central control triggers changes to the content displayed on all connected devices.

This was designed to provide a second screen during a keynote opening sequence at a major company's large event. A number of images are displayed in a grid that automatically arranges and re-arranges the images depending on the device's screen size and orientation.
Images are revealed and hidden according to manual triggers, a timed sequence or a hybrid of manual and timed. These device events are triggered by the server using a central control panel webpage.

The underlying technology ensures that the best performance is squeezed out of the server hardware while minimising network traffic. Any device with a web browser, including mobile and tablet devices, can connect to this system.


Installation
  npm install -g pm2

Install pm2 for multi-threading

Install redis:
  wget http://download.redis.io/releases/redis-2.8.3.tar.gz
  tar xzf redis-2.8.3.tar.gz
  cd redis-2.8.3
  make

Clone this repository to your server (only tested on OSX and Linux)
  git clone http://github.com/workingmatt/milan.git
  cd milan
  git fetch origin ubuntu-pm2:ubuntu-pm2
  git checkout ubuntu-pm2
  npm install to install

Set up
  Copy any images into public/images/
  Edit home_script.js to change how many and which images are loaded/displayed.
  Edit the triggers and events in sausage_script.js

Starting Second Screen server
  ifconfig
  note ip address
  cd <installation directory>
  ./redis-2.8.3/src/redis-server &
  <return>
  pm2 start milan/server.js -i max

Operation
  Point all clients to <ip addr>:2014
  Open the admin screen <ip addr>:2014/<admin page name>
  If you want to monitor server performance pm2 monit

Shutdown
  pm2 stop all
  pm2 kill
  ./redis-2.8.3/src/redis-cli shutdown



