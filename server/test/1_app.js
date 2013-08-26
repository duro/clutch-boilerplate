/*global describe, it*/
/* jshint -W030, -W098 */
var locomotive  = require('locomotive')
  , should      = require('should');

describe('App', function() {

  it('should be in testing mode', function() {
    locomotive.get('isTesting').should.be.true;
  });

});