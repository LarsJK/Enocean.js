'use strict';

var util = require('util'),
    BasePacket = require('./base-packet');

function ResponsePacket(data, optional) {
    ResponsePacket.super_.call(
        this,
        ResponsePacket.typeId,
        data,
        optional
    );

    return this;
}

util.inherits(ResponsePacket, BasePacket);

ResponsePacket.typeId = 0x02;

ResponsePacket.prototype.inspect = function () {
    return '' +
        'Response,' + '\n' +
        '  status        : ' + this.returnCodeDescription + '\n' +
        '  data          : ' + this.responseData.inspect() + '\n' +
        '  optional data : ' + this.optionalData.inspect() + '\n' +
    '';
};

Object.defineProperty(ResponsePacket.prototype, 'returnCodeDescription', {
    get: function () {
        var returnCodes = {
            0: 'OK',
            1: 'error',
            2: 'not supported',
            3: 'wrong parameter',
            4: 'operation denied',
        };
        return returnCodes[this.data.readUInt8(0)];
    }
});

Object.defineProperty(ResponsePacket.prototype, 'returnCode', {
    get: function () {
        return this.data.readUInt8(0);
    }
});

Object.defineProperty(ResponsePacket.prototype, 'responseData', {
    get: function () {
        return this.data.slice(1, this.data.length);
    }
});

module.exports = ResponsePacket;
