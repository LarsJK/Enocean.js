'use strict';

var assert = require('assert'),
    RadioPacket = require('../lib/radio-packet');

describe('RadioPacket', function () {

    beforeEach(function () {
        this.packet = new RadioPacket(
            new Buffer([0xD2, 0x00, 0x00, 0xFF, 0x08, 0x00, 0x24, 0xFE, 0x70, 0x1E]),
            new Buffer([0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x79, 0x00])
        );
    });

    describe('constructor', function () {

        it('should return self with set properties', function () {
            assert.equal(this.packet.typeId, 0x01, 'typeId');

            assert.deepEqual(this.packet.data, new Buffer([0xD2, 0x00, 0x00, 0xFF, 0x08, 0x00, 0x24, 0xFE, 0x70, 0x1E]), 'data');

            assert.deepEqual(this.packet.optionalData, new Buffer([0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x79, 0x00]), 'optionalData');
        });
    });

    describe('serialize', function () {

        it('should return a buffer with correct format', function () {
            var buf = this.packet.serialize();

            assert.deepEqual(buf, new Buffer([0x55, 0x00, 0x0A, 0x07, 0x01, 0xEB, 0xD2, 0x00, 0x00, 0xFF, 0x08, 0x00, 0x24, 0xFE, 0x70, 0x1E, 0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x79, 0x00, 0xC7]));
        });
    });

    // describe('data properties', function () {
    //
    //     it('should have choice', function () {
    //         this.packet.choice.should.equal(0xD2);
    //     });
    //
    //     it('should have payload', function () {
    //         this.packet.payload.toString().should.equal(new Buffer([0x00, 0x00, 0xFF, 0x08]).toString());
    //     });
    //
    //     it('should have senderId', function () {
    //         this.packet.senderId.toString().should.equal(new Buffer([0x00, 0x24, 0xFE, 0x70]).toString());
    //     });
    //
    //     it('should have status', function () {
    //         this.packet.status.should.equal(0x1E);
    //     });
    // });

    describe('optional data properties', function () {

        it('should have subTelNum', function () {
            assert.equal(this.packet.subTelNum, 0x01);
        });

        it('should have destinationId', function () {
            assert.deepEqual(this.packet.destinationId, new Buffer([0xFF, 0xFF, 0xFF, 0xFF]));
        });

        it('should have dBm', function () {
            assert.equal(this.packet.dBm, 0x79);
        });

        it('should have securityLevel', function () {
            assert.equal(this.packet.securityLevel, 0x00);
        });
    });

    describe('inspect', function () {
        it('should have a detailed inspect method', function () {
            var correctInspect = '' +
                'Radio, ' + '\n' +
                '  data          : <Buffer d2 00 00 ff 08 00 24 fe 70 1e>\n' +
                '  optional Data :\n' +
                '    subTelNum     : 1\n' +
                '    destinationId : <Buffer ff ff ff ff>\n' +
                '    dBm           : 121\n' +
                '    securityLevel : 0\n' +
            '';
            assert.equal(this.packet.inspect(), correctInspect);
        });
    });
});
