'use strict';

var should = require('should'),
    ResponsePacket = require('../lib/response-packet');

describe('ResponsePacket', function () {

    beforeEach(function () {
        this.packet = new ResponsePacket(
            new Buffer([0x00, 0xFF])
        );
    });

    describe('constructor', function () {

        it('should return self with set properties', function () {
            this.packet.typeId.should.equal(0x02, 'typeId');

            this.packet.data.toString()
                .should.equal(new Buffer([0x00, 0xFF]).toString());
        });
    });

    describe('serialize', function () {

        it('should return a buffer with correct format', function () {
            var buf = this.packet.serialize();

            buf.toString().should.equal(new Buffer([0x55, 0x00, 0x02, 0x00, 0x02, 0xD8, 0x00, 0xFF, 0xF3]).toString());
        });
    });

    describe('data properties', function () {

        it('should have returnCode', function () {
            this.packet.returnCode.should.equal(0x00);
        });

        it('should have responseData', function () {
            this.packet.responseData.toString().should.equal(new Buffer([0xFF]).toString());
        });
    });
});
