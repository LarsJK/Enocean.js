'use strict';

var BasePacket = require('./base-packet'),
    RadioPacket = require('./radio-packet'),
    ResponsePacket = require('./response-packet');

function PacketFactory(raw) {

    switch (raw.typeId) {
        case RadioPacket.typeId:
            return new RadioPacket(raw.data, raw.optionalData);
        case ResponsePacket.typeId:
            return new ResponsePacket(raw.data);
        default:
            return new BasePacket(raw.typeId, raw.data, raw.optionalData);
    }
}

module.exports = PacketFactory;
