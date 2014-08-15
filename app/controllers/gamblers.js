'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(gamblers){
    //console.log(gamblers);
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.init = function(req, res){};

exports.show = function(req, res){};

exports.create = function(req, res){};

exports.initAsset = function(req, res){};

exports.createAsset = function(req, res){};

exports.liquidate = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    //console.log('gambler:', gambler);
    gambler.liquidate(req.params.name, function(obj){
      //console.log('liquidate:', obj);
      res.send(obj);
    });
  });
};
