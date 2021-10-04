//inject mocha globally to allow custom interface refer without direct import - bypass bundle issue
global._ = require('lodash');
global.mocha = require('mocha');
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

// TODO: literally anything to avoid this... can't figure out how
// to get mocha to get these constants out of `@types/screeps`
global.WORK = 'work';
global.CARRY = 'carry';
global.MOVE = 'move';
global.BODYPART_COST = {
  [WORK]: 100,
  [CARRY]: 50,
  [MOVE]: 50,
};

// Override ts-node compiler options
process.env.TS_NODE_PROJECT = 'tsconfig.test.json'
