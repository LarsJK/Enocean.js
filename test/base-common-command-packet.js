'use strict';

var assert = require('assert'),
    BaseCommonCommandPacket = require('../lib/common-commands/base-common-command-packet');

describe('BaseCommonCommandPacket', function () {

    beforeEach(function () {
        this.packet = new BaseCommonCommandPacket(
            0x00, new Buffer([0xFF])
        );
    });

    describe('constructor', function () {

        it('should return self with set properties', function () {
            this.packet.typeId.should.equal(0x05, 'typeId');

            assert.deepEqual(this.packet.data, new Buffer([0x00, 0xFF]));
        });
    });

    describe('serialize', function () {

        it('should return a buffer with correct format', function () {
            var buf = this.packet.serialize();

            assert.deepEqual(buf, new Buffer([0x55, 0x00, 0x02, 0x00, 0x05, 0xCD, 0x00, 0xFF, 0xF3]));
        });
    });

    describe('data properties', function () {

        it('should have commonCommandCode', function () {
            assert.equal(this.packet.commonCommandCode, 0x00);
        });

        it('should have commonCommandData', function () {
            assert.deepEqual(this.packet.commonCommandData, new Buffer([0xFF]));
        });
    });

    // describe('Common Command Codes', function () {
    //
    //     it('should have all codes', function () {
    //         BaseCommonCommandPacket.CO_WR_SLEEP.should.equal(1, 'CO_WR_SLEEP');
    //         BaseCommonCommandPacket.CO_WR_RESET.should.equal(2, 'CO_WR_RESET');
    //         BaseCommonCommandPacket.CO_RD_VERSION.should.equal(3, 'CO_RD_VERSION');
    //         BaseCommonCommandPacket.CO_RD_SYS_LOG.should.equal(4, 'CO_RD_SYS_LOG');
    //         BaseCommonCommandPacket.CO_WR_SYS_LOG.should.equal(5, 'CO_WR_SYS_LOG');
    //         BaseCommonCommandPacket.CO_WR_BIST.should.equal(6, 'CO_WR_BIST');
    //         BaseCommonCommandPacket.CO_WR_IDBASE.should.equal(7, 'CO_WR_IDBASE');
    //         BaseCommonCommandPacket.CO_RD_IDBASE.should.equal(8, 'CO_RD_IDBASE');
    //         BaseCommonCommandPacket.CO_WR_REPEATER.should.equal(9, 'CO_WR_REPEATER');
    //         BaseCommonCommandPacket.CO_RD_REPEATER.should.equal(10, 'CO_RD_REPEATER');
    //         BaseCommonCommandPacket.CO_WR_FILTER_ADD.should.equal(11, 'CO_WR_FILTER_ADD');
    //         BaseCommonCommandPacket.CO_WR_FILTER_DEL.should.equal(12, 'CO_WR_FILTER_DEL');
    //         BaseCommonCommandPacket.CO_WR_FILTER_DEL_ALL.should.equal(13, 'CO_WR_FILTER_DEL_ALL');
    //         BaseCommonCommandPacket.CO_WR_FILTER_ENABLE.should.equal(14, 'CO_WR_FILTER_ENABLE');
    //         BaseCommonCommandPacket.CO_RD_FILTER.should.equal(15, 'CO_RD_FILTER');
    //         BaseCommonCommandPacket.CO_WR_WAIT_MATURITY.should.equal(16, 'CO_WR_WAIT_MATURITY');
    //         BaseCommonCommandPacket.CO_WR_SUBTEL.should.equal(17, 'CO_WR_SUBTEL');
    //         BaseCommonCommandPacket.CO_WR_MEM.should.equal(18, 'CO_WR_MEM');
    //         BaseCommonCommandPacket.CO_RD_MEM.should.equal(19, 'CO_RD_MEM');
    //         BaseCommonCommandPacket.CO_RD_MEM_ADDRESS.should.equal(20, 'CO_RD_MEM_ADDRESS');
    //         BaseCommonCommandPacket.CO_RD_SECURITY.should.equal(21, 'CO_RD_SECURITY');
    //         BaseCommonCommandPacket.CO_WR_SECURITY.should.equal(22, 'CO_WR_SECURITY');
    //     });
    // });
});
