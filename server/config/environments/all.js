var express = require('express')
  , path    = require('path')
  , swig    = require('swig');

module.exports = function() {

  // Setup template engine
  this.engine('html', swig.renderFile);
  this.set('view engine', 'html');
  this.set('views', path.join(__dirname, '../../templates'));

  // Override default template extension.  By default, Locomotive finds
  // templates using the `name.format.engine` convention, for example
  // `index.html.ejs`  For some template engines, such as Jade, that find
  // layouts using a `layout.engine` notation, this results in mixed conventions
  // that can cuase confusion.  If this occurs, you can map an explicit
  // extension to a format.
  /* this.format('html', { extension: '.jade' }) */

  // Register formats for content negotiation.  Using content negotiation,
  // different formats can be served as needed by different clients.  For
  // example, a browser is sent an HTML response, while an API client is sent a
  // JSON or XML response.
  /* this.format('xml', { engine: 'xmlb' }); */

  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  this.use(express.logger());
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../../public'));
  this.use(express.bodyParser());
  this.use(express.methodOverride());
  this.use(this.router);
};
