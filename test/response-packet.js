'use strict';

var assert = require('assert'),
    ResponsePacket = require('../lib/response-packet');

describe('ResponsePacket', function () {

    beforeEach(function () {
        this.packet = new ResponsePacket(
            new Buffer([0x00, 0xFF])
        );
    });

    describe('constructor', function () {

        it('should return self with set properties', function () {
            assert.equal(this.packet.typeId, 0x02, 'typeId should be 0x02');

            assert.deepEqual(this.packet.data, new Buffer([0x00, 0xFF]), 'data should be 0x00, 0xFF');
        });
    });

    describe('serialize', function () {

        it('should return a buffer with correct format', function () {
            var buf = this.packet.serialize();

            assert.deepEqual(
                buf,
                new Buffer([0x55, 0x00, 0x02, 0x00, 0x02, 0xD8, 0x00, 0xFF, 0xF3])
            );
        });
    });

    describe('data properties', function () {

        it('should have returnCode', function () {
            assert.equal(this.packet.returnCode, 0x00);
        });

        it('should have description for return codes', function () {
            var okPacket = new ResponsePacket(new Buffer([0x00, 0xFF]));
            var errorPacket = new ResponsePacket(new Buffer([0x01, 0xFF]));
            var notSupportedPacket = new ResponsePacket(new Buffer([0x02, 0xFF]));
            var wrongParamPacket = new ResponsePacket(new Buffer([0x03, 0xFF]));
            var deniedPacket = new ResponsePacket(new Buffer([0x04, 0xFF]));

            assert.equal(okPacket.returnCodeDescription, 'OK');
            assert.equal(errorPacket.returnCodeDescription, 'error');
            assert.equal(notSupportedPacket.returnCodeDescription, 'not supported');
            assert.equal(wrongParamPacket.returnCodeDescription, 'wrong parameter');
            assert.equal(deniedPacket.returnCodeDescription, 'operation denied');
        });

        it('should have responseData', function () {
            assert.deepEqual(
                this.packet.responseData,
                new Buffer([0xFF])
            );
        });
    });

    describe('inspect', function () {
        it('should have a detailed inspect method', function () {
            var correctInspect = '' +
                'Response,' + '\n' +
                '  status        : OK\n' +
                '  data          : <Buffer ff>\n' +
                '  optional data : <Buffer >\n' +
            '';
            assert.equal(this.packet.inspect(), correctInspect);
        });
    });
});
