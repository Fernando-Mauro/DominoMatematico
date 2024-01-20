var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
  silent: true,
  args: []
});

child.on('exit', function () {
  console.log('Tu aplicación ha salido después de 3 reinicios');
});

child.start();
