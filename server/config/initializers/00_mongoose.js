module.exports = function() {

  var fs        = require('fs')
    , path      = require('path')
    , _         = require('lodash')
    , mongoose  = require('mongoose');

  // Connect to DB and Setup Models
  mongoose.connect('mongodb://localhost/<%= appName %>');
  var models = fs.readdirSync(path.join(__dirname, '../../app/models'));

  // Filter out any .dotfiles
  models = _.filter(models, function(filename) {
    return filename.substr(0,1) !== '.';
  });

  // Initialize models
  models.forEach(function(name) {
    var model           = require('../../app/models/' + name)
      , collectionName  = model.collection || null
      , modelName       = model.name || _.str.camelize(name.slice(0,name.indexOf('.')));
    mongoose.model(modelName, model.schema, collectionName);
  });

};
