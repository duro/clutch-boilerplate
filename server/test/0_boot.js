/*global before*/
var locomotive  = require('locomotive');

before(function(done){
  console.log('Starting boot sequence...');

  // Boot the app
  locomotive.boot(__dirname + '/../', 'testing', function(err, express) {
    if (err) return done(err);
    locomotive.set('isTesting', true);

    console.log('Boot sequence complete!');
    console.log('\n');

    express.listen(6660, function() {
      var addr = this.address();
      console.log('Test Server started at port '+addr.port);
      done();
    });

  });
});