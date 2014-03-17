'use strict';

var BasePacket = require('./base-packet'),
    RadioPacket = require('./radio-packet'),
    ResponsePacket = require('./response-packet');

function PacketFactory(raw) {

    switch (raw.typeId) {
        case RadioPacket.typeId:
            return new RadioPacket(raw.data, raw.optional);
        case ResponsePacket.typeId:
            return new ResponsePacket(raw.data, raw.optional);
        default:
            return new BasePacket(raw.typeId, raw.data, raw.optional);
    }
}

module.exports = PacketFactory;
