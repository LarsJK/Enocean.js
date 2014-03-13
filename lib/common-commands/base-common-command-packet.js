'use strict';

var util = require('util'),
    BasePacket = require('../base-packet');

function BaseCommonCommandPacket(code, data, optionalData) {
    code = new Buffer([code]);
    data = data ? Buffer.concat([code, data]) : code;

    BaseCommonCommandPacket.super_.call(
        this,
        BaseCommonCommandPacket.typeId,
        data,
        optionalData
    );

    return this;
}

util.inherits(BaseCommonCommandPacket, BasePacket);

BaseCommonCommandPacket.typeId = 0x05;

Object.defineProperty(BaseCommonCommandPacket.prototype, 'commonCommandCode', {
    get: function () {
        return this.data.readUInt8(0);
    }
});

Object.defineProperty(BaseCommonCommandPacket.prototype, 'commonCommandData', {
    get: function () {
        return this.data.slice(1);
    }
});

// Object.defineProperties(BaseCommonCommandPacket, {
//     'CO_WR_SLEEP': { value: 1, writable: false },
//     'CO_WR_RESET': { value: 2, writable: false },
//     'CO_RD_VERSION': { value: 3, writable: false },
//     'CO_RD_SYS_LOG': { value: 4, writable: false },
//     'CO_WR_SYS_LOG': { value: 5, writable: false },
//     'CO_WR_BIST': { value: 6, writable: false },
//     'CO_WR_IDBASE': { value: 7, writable: false },
//     'CO_RD_IDBASE': { value: 8, writable: false },
//     'CO_WR_REPEATER': { value: 9, writable: false },
//     'CO_RD_REPEATER': { value: 10, writable: false },
//     'CO_WR_FILTER_ADD': { value: 11, writable: false },
//     'CO_WR_FILTER_DEL': { value: 12, writable: false },
//     'CO_WR_FILTER_DEL_ALL': { value: 13, writable: false },
//     'CO_WR_FILTER_ENABLE': { value: 14, writable: false },
//     'CO_RD_FILTER': { value: 15, writable: false },
//     'CO_WR_WAIT_MATURITY': { value: 16, writable: false },
//     'CO_WR_SUBTEL': { value: 17, writable: false },
//     'CO_WR_MEM': { value: 18, writable: false },
//     'CO_RD_MEM': { value: 19, writable: false },
//     'CO_RD_MEM_ADDRESS': { value: 20, writable: false },
//     'CO_RD_SECURITY': { value: 21, writable: false },
//     'CO_WR_SECURITY': { value: 22, writable: false }
// });

module.exports = BaseCommonCommandPacket;
