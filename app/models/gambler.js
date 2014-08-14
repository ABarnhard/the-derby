'use strict';

var _     = require('lodash'),
    Mongo = require('mongodb');

function Gambler(){
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.prototype.removeAsset = function(name, cb){
  if(this.assets.length === 0){
    if(cb){
      cb({isDivorced:true, cash:this.cash});
    }
    return;
  }

  var index = _.findIndex(this.assets, function(asset){return asset.name === name;}),
      sold  = this.assets.splice(index, 1)[0],
      self = this;

  this.cash += sold.value;
  this.isDivorced = this.assets.length === 0;
  //console.log(this);
  Gambler.collection.save(this, function(){
    cb({isDivorced:self.isDivorced, cash:self.cash});
  });
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Gambler.collection.findOne({}, function(err, obj){
    cb(_.create(Gambler.prototype, obj));
  });
};

module.exports = Gambler;

