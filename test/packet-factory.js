'use strict';

var should = require('should'),
    factory = require('../lib/packet-factory'),
    BasePacket = require('../lib/base-packet'),
    RadioPacket = require('../lib/radio-packet'),
    ResponsePacket = require('../lib/response-packet');

describe('PacketFactory', function () {

    it('should create BasePacket if typeId is out of range', function () {
        var raw = {
            typeId: 0xFF,
            data: new Buffer([0xD2, 0x00, 0x00, 0xFF, 0x08, 0x00, 0x24, 0xFE, 0x70, 0x1E]),
            optionalData: new Buffer([0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x79, 0x00])
        };

        var packet = factory(raw);

        packet.constructor.should.equal(BasePacket);
    });

    it('should create RadioPacket if typeId is 0x01', function () {
        var raw = {
            typeId: 0x01,
            data: new Buffer([0xD2, 0x00, 0x00, 0xFF, 0x08, 0x00, 0x24, 0xFE, 0x70, 0x1E]),
            optionalData: new Buffer([0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x79, 0x00])
        };

        var packet = factory(raw);

        packet.constructor.should.equal(RadioPacket);
    });

    it('should create ResponsePacket if typeId is 0x02', function () {
        var raw = {
            typeId: 0x02,
            data: new Buffer([0x00, 0xFF]),
            optionalData: new Buffer(0)
        };

        var packet = factory(raw);

        packet.constructor.should.equal(ResponsePacket);
    });
});
