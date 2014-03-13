'use strict';

var should = require('should'),
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
            this.packet.typeId.should.equal(0x01, 'typeId');

            this.packet.data.toString()
                .should.equal(new Buffer([0xD2, 0x00, 0x00, 0xFF, 0x08, 0x00, 0x24, 0xFE, 0x70, 0x1E]).toString(), 'data');

            this.packet.optionalData.toString()
                .should.equal(new Buffer([0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x79, 0x00]).toString(), 'optionalData');
        });
    });

    describe('serialize', function () {

        it('should return a buffer with correct format', function () {
            var buf = this.packet.serialize();

            buf.toString().should.equal(new Buffer([0x55, 0x00, 0x0A, 0x07, 0x01, 0xEB, 0xD2, 0x00, 0x00, 0xFF, 0x08, 0x00, 0x24, 0xFE, 0x70, 0x1E, 0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x79, 0x00, 0xC7]).toString());
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
            this.packet.subTelNum.should.equal(0x01);
        });

        it('should have destinationId', function () {
            this.packet.destinationId.toString().should.equal(new Buffer([0xFF, 0xFF, 0xFF, 0xFF]).toString());
        });

        it('should have dBm', function () {
            this.packet.dBm.should.equal(0x79);
        });

        it('should have securityLevel', function () {
            this.packet.securityLevel.should.equal(0x00);
        });
    });
});
