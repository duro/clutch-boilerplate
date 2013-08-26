// Require dependencies
var locomotive  = require('locomotive')
  , cluster     = require('cluster')
  , cli;

// Define our bootloader CLI
cli = require('optimist')
  .usage('The nodegigs bootloader')
  .options('e', {
    alias: 'env',
    default: process.env.NODE_ENV || 'development'
  })
  .options('p', {
    alias: 'port',
    default: process.env.PORT || 3000
  })
  .options('w', {
    alias: 'workers',
    default: require('os').cpus().length
  })
  .argv;

// Code to run if we're in the master process
if (cluster.isMaster) {
  for (var i = 0; i < cli.workers; i += 1) {
    cluster.fork();
  }
// Code to run if we're in a worker process
} else {
  // Boot Locomotive.
  // Calls back with a fully configured express instance.
  console.log('Worker %s: Starting boot sequence...', cluster.worker.id);
  locomotive.boot(__dirname, cli.env, function(err, express) {
    if (err) throw err;

    // Start Express Server
    express.listen(cli.port, function() {
      var addr = this.address();
      console.log('Worker %s: Server started. [Env: %s] [Addr: %s] [Port: %s]', cluster.worker.id, cli.env, addr.address, addr.port);
    });
  });
}

cluster.on('exit', function (worker) {

  // Replace the dead worker,
  // we're not sentimental
  console.log('Worker %s died :(', worker.id);
  cluster.fork();

});