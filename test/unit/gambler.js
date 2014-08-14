/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'the-derby-test';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var g = new Gambler();
      expect(g).to.be.instanceof(Gambler);
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a gambler in database', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        expect(gambler._id.toString()).to.equal('000000000000000000000001');
        expect(gambler).to.respondTo('removeAsset');
        done();
      });
    });
  });

  describe('#removeAsset', function(){
    it('should remove an asset from the gambler and increase cash', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.removeAsset('Ring', function(obj){
          expect(obj.cash).to.be.closeTo(5000, 0.1);
          expect(obj.isDivorced).to.be.false;
          expect(gambler.assets).to.have.length(2);
          done();
        });
      });
    });
    it('should not remove an asset from the gambler or increase cash', function(done){
      Gambler.findById('000000000000000000000002', function(gambler){
        gambler.assets = [];
        gambler.removeAsset('Ring', function(obj){
          expect(obj.cash).to.be.closeTo(1000, 0.1);
          expect(gambler.assets).to.have.length(0);
          done();
        });
      });
    });
  });

});

