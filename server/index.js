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

if (cli.env === 'development') {

  bootLocomotive(function(addr) {
    console.log('Server started. [Env: %s] [Addr: %s] [Port: %s]', cli.env, addr.address, addr.port);
  });

} else {

  // Code to run if we're in the master process
  if (cluster.isMaster) {
    for (var i = 0; i < cli.workers; i += 1) {
      cluster.fork();
    }
  // Code to run if we're in a worker process
  } else {
    console.log('Worker %s: Starting boot sequence...', cluster.worker.id);
    bootLocomotive(function(addr){
      console.log('Worker %s: Server started. [Env: %s] [Addr: %s] [Port: %s]', cluster.worker.id, cli.env, addr.address, addr.port);
    })
  }

}

function bootLocomotive(cb) {
  // Boot Locomotive.
  // Calls back with a fully configured express instance.
  locomotive.boot(__dirname, cli.env, function(err, express) {
    if (err) throw err;

    // Start Express Server
    express.listen(cli.port, function() {
      var addr = this.address();
      cb(addr);
    });
  });
}

// Cluster exit handler
cluster.on('exit', function (worker) {

  // Replace the dead worker,
  // we're not sentimental
  console.log('Worker %s died :(', worker.id);
  cluster.fork();

});
