'use strict';

var assert = require('assert'),
	crc = require('../lib/crc');

describe('crc()', function () {
	it('should work with buffers', function () {
		var buf = new Buffer([0x00, 0x04, 0x08, 0x02]);

		assert.equal(crc(buf), 13);
	});
});
