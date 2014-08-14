/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'the-derby-test',
    g;

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      g = new Gambler({name:'Bob', photo:'bob.jpg', cash:'1000', spouse:{name:'Bobet', photo:'bobet.jpg'}});
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      expect(g).to.be.instanceof(Gambler);
      expect(g.name).to.equal('Bob');
      expect(g.photo).to.equal('bob.jpg');
      expect(g.cash).to.equal(1000);
      expect(g.spouse.name).to.equal('Bobet');
      expect(g.spouse.photo).to.equal('bobet.jpg');
      expect(g.assets).to.have.length(0);
      expect(g.results.wins).to.equal(0);
      expect(g.results.losses).to.equal(0);
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a gambler in database', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        expect(gambler._id.toString()).to.equal('000000000000000000000001');
        expect(gambler).to.respondTo('sellAsset');
        done();
      });
    });
  });

  describe('#save', function(){
    it('should save a gambler in the database', function(done){
      g.save(function(){
        expect(g._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('#isDivorced', function(){
    it('should return false if 1 or more assests left', function(){
      g.assets = [{name:'test', photo:'test.jpg', value:5}];
      expect(g.isDivorced).to.equal(false);
    });
    it('should return true if 0 assests left', function(){
      g.assets = [];
      expect(g.isDivorced).to.equal(true);
    });
  });

  describe('#sellAsset', function(){
    it('should remove an asset from the gambler and increase cash', function(){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.sellAsset('Ring');
        expect(gambler.cash).to.be.closeTo(5000, 0.1);
        expect(gambler.isDivorced).to.equal(false);
        expect(gambler.assets).to.have.length(2);
      });
    });
    it('should not remove an asset from the gambler or increase cash', function(){
      Gambler.findById('000000000000000000000002', function(gambler){
        gambler.assets = [];
        gambler.sellAsset('Ring');
        expect(gambler.cash).to.be.closeTo(1000, 0.1);
        expect(gambler.assets).to.have.length(0);
      });
    });
  });

});

