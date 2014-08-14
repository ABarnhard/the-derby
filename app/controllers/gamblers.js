'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};
