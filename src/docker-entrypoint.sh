"sed -i 's/localhost:3000/192.168.99.100:4000/g' /usr/share/nginx/html/env.js"
envsubst < /usr/share/nginx/html/env.js


sed -i 's/localhost:3000/$apiurl/g' /usr/share/nginx/html/env.js && envsubst < /usr/share/nginx/html/env.js