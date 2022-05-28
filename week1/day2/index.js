const http = require('http');

const server = http.createServer((request, response) => {
  console.log(request.url);
  if (request.url == '/') {
    response.write('You reached the front door');
    response.end();
  } else if (request.url == '/Enes') {
    response.write(
      'Hello, you reached building localhost and door 3000, this is Enes" flat'
    );
    response.end();
  } else {
    response.statusCode = 404;
    response.write('404 Not found');
    response.end();
  }
});

server.listen(3000);
