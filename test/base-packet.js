'use strict';

var assert = require('assert'),
    BasePacket = require('../lib/base-packet');

describe('BasePacket', function () {

    describe('constructor', function () {

        it('should return self with set properties', function () {
            var packet = new BasePacket(0x05, new Buffer([0x02]), new Buffer([0x07]));

            assert.equal(packet.typeId, 0x05);
            assert.deepEqual(packet.data, new Buffer([0x02]));
            assert.deepEqual(packet.optionalData, new Buffer([0x07]));
        });
    });

    describe('serialize', function () {

        it('should return a buffer with correct format', function () {
            var packet = new BasePacket(0x05, new Buffer([0x02]), new Buffer([0x07]));

            var buf = packet.serialize();

            assert.deepEqual(buf, new Buffer([0x55, 0x00, 0x01, 0x01, 0x05, 0x65, 0x02, 0x07, 0x3F]));
        });
    });
});
