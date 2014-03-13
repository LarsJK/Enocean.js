'use strict';

var should = require('should'),
    BasePacket = require('../lib/base-packet');

describe('BasePacket', function () {

    describe('constructor', function () {

        it('should return self with set properties', function () {
            var packet = new BasePacket(0x05, new Buffer([0x02]), new Buffer([0x07]));

            packet.typeId.should.equal(0x05);
            packet.data.toString().should.equal(new Buffer([0x02]).toString());
            packet.optionalData.toString().should.equal(new Buffer([0x07]).toString());
        });
    });

    describe('serialize', function () {

        it('should return a buffer with correct format', function () {
            var packet = new BasePacket(0x05, new Buffer([0x02]), new Buffer([0x07]));

            var buf = packet.serialize();

            buf.toString().should.equal(new Buffer([0x55, 0x00, 0x01, 0x01, 0x05, 0x65, 0x02, 0x07, 0x3F]).toString());
        });
    });
});
