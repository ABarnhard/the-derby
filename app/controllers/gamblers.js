'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.pawn = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.removeAsset(req.params.name, function(obj){
      res.send({id:req.params.id, name:req.params.name, isDivorced:obj.isDivorced, cash:obj.cash});
    });
  });
};
