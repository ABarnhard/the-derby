'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(gamblers){
    //console.log(gamblers);
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.init = function(req, res){
  res.render('gamblers/init');
};

exports.show = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    res.render('gamblers/show', {gambler:gambler});
  });
};

exports.create = function(req, res){
  var g = new Gambler(req.body);
  g.save(function(){
    res.redirect('/gamblers');
  });
};

exports.initAsset = function(req, res){
  res.render('gamblers/init-asset', {id:req.params.id});
};

exports.createAsset = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.acquire(req.body, function(){
      res.redirect('/gamblers/' + req.params.id);
    });
  });
};

exports.liquidate = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    //console.log('gambler:', gambler);
    gambler.liquidate(req.params.name, function(obj){
      //console.log('liquidate:', obj);
      res.send(obj);
    });
  });
};
