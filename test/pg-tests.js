'use strict';
var co = require('co'),
    should = require('chai').should(),
    pg = require('../lib'),
    testHelper = require('./test-helper');


describe('CoPG', function() {
	var connString = null;

	before(function(done) {
		co(function *() {
			var config = yield testHelper.getConfig();
			connString = config.connectionStrings.main;
		})(done);
	});

	describe('#connect_()', function() {
		it('should connect a pool', function(done) {
			co(function *() {
				var results = yield pg.connect_(connString);
				var client = results[0];
				var clientDone = results[1];

				should.exist(client);
				clientDone();
			})(done);
		});
	});
});
