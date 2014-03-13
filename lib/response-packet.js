'use strict';

var util = require('util'),
    BasePacket = require('./base-packet');

function ResponsePacket(data) {
    ResponsePacket.super_.call(
        this,
        ResponsePacket.typeId,
        data
    );

    return this;
}

util.inherits(ResponsePacket, BasePacket);

ResponsePacket.typeId = 0x02;

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
