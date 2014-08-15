'use strict';

var _     = require('lodash'),
    Mongo = require('mongodb');

function Gambler(o){
  o = strip(o);
  o.spouse = strip(o.spouse);
  this.name = o.name || 'Taker of Risks';
  this.photo = o.photo || 'http://i.dailymail.co.uk/i/pix/2008/03_04/chimpDM2503_468x452.jpg';
  this.cash = o.cash * 1;
  this.spouse = {};
  this.spouse.name = o.spouse.name || 'Lady Luck';
  this.spouse.photo = o.spouse.photo || 'http://armedforcesmuseum.com/wp-content/uploads/2011/10/lady-Luck-Green1.jpg';
  this.assets = [];
  this.results = {wins:0, losses:0};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Object.defineProperty(Gambler.prototype, 'isDivorced', {
  get: function(){return this.assets.length === 0;}
});

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

Gambler.prototype.sellAsset = function(name){
  if(!this.assets.length){return;}
  var index = _.findIndex(this.assets, function(asset){return asset.name === name;}),
      sold  = this.assets.splice(index, 1)[0];
  this.cash += sold.value;
};

Gambler.prototype.liquidate = function(name, cb){
  this.sellAsset(name);
  var data = {id:this._id.toString(), name:name, cash:this.cash, isDivorced:this.isDivorced};
  this.save(function(){
    cb(data);
  });
};

Gambler.prototype.addAsset = function(o){
  o = strip(o);
  o.name = o.name || 'Something';
  o.photo = o.photo || 'http://www.oilersaddict.com/wp-content/uploads/2013/09/QuestionMarks.jpg';
  o.value = (o.value) ? o.value * 1 : 0;
  this.assets.push(o);
};

Gambler.prototype.acquire = function(o, cb){
  this.addAsset(o);
  this.save(cb);
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(function(err, objs){
    var gamblers = objs.map(function(o){return _.create(Gambler.prototype, 0);});
    cb(gamblers);
  });
};

Gambler.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Gambler.collection.findOne({}, function(err, obj){
    cb(_.create(Gambler.prototype, obj));
  });
};

module.exports = Gambler;


// helper functions

function strip(o){
  var properties = Object.keys(o);
  properties.forEach(function(property){
    if(typeof o[property] === 'string'){
      o[property] = o[property].trim();
    }
  });
  return o;
}
