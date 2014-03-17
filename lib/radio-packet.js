'use strict';

var util = require('util'),
    BasePacket = require('./base-packet');

function RadioPacket(data, optionalData) {
    RadioPacket.super_.call(
        this,
        RadioPacket.typeId,
        data,
        optionalData || new Buffer(7)
    );

    return this;
}

util.inherits(RadioPacket, BasePacket);

RadioPacket.typeId = 0x01;

RadioPacket.prototype.inspect = function () {
    return '' +
        'Radio, ' + '\n' +
        '  data          : ' + this.data.inspect() + '\n' +
        '  optional Data :' + '\n' +
        '    subTelNum     : ' + this.subTelNum + '\n' +
        '    destinationId : ' + this.destinationId.inspect() + '\n' +
        '    dBm           : ' + this.dBm + '\n' +
        '    securityLevel : ' + this.securityLevel + '\n' +
    '';
};

// Object.defineProperty(RadioPacket.prototype, 'choice', {
//     get: function () {
//         return this.data.readUInt8(0);
//     }
// });
//
// Object.defineProperty(RadioPacket.prototype, 'payload', {
//     get: function () {
//         return this.data.slice(1, this.data.length - 5);
//     }
// });
//
// Object.defineProperty(RadioPacket.prototype, 'senderId', {
//     get: function () {
//         return this.data.slice(this.data.length - 5, this.data.length - 1);
//     }
// });
//
// Object.defineProperty(RadioPacket.prototype, 'status', {
//     get: function () {
//         return this.data.readUInt8(this.data.length - 1);
//     }
// });

Object.defineProperty(RadioPacket.prototype, 'subTelNum', {
    get: function () {
        return this.optionalData.readUInt8(0);
    }
});

Object.defineProperty(RadioPacket.prototype, 'destinationId', {
    get: function () {
        return this.optionalData.slice(1, 5);
    }
});

Object.defineProperty(RadioPacket.prototype, 'dBm', {
    get: function () {
        return this.optionalData.readUInt8(5);
    }
});

Object.defineProperty(RadioPacket.prototype, 'securityLevel', {
    get: function () {
        return this.optionalData.readUInt8(6);
    }
});

module.exports = RadioPacket;
