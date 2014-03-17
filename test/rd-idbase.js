'use strict';

var assert = require('assert'),
    RdIdbase = require('../lib/common-commands/rd-idbase.js');

describe('RdIdbase', function () {

    beforeEach(function () {
        this.packet = new RdIdbase();
    });

    describe('constructor', function () {

        it('should return self with set properties', function () {
            assert.equal(this.packet.typeId, 0x05, 'typeId');

            assert.deepEqual(this.packet.data, new Buffer([8]), 'data');
        });
    });
});
