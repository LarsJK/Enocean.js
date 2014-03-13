'use strict';

var crc = require('./crc');

function BasePacket(typeId, data, optionalData) {
    this.typeId = typeId;
    this.data = data;
    this.optionalData = optionalData || new Buffer(0);

    return this;
}

BasePacket.prototype._header = function () {
    var header = new Buffer(4);
	header.writeUInt16BE(this.data.length, 0); //data length
	header.writeUInt8(this.optionalData.length, 2);	//optional data length
	header.writeUInt8(this.typeId, 3);

    return header;
};

BasePacket.prototype.serialize = function () {
    var header = this._header();
    var headerCrc = crc(header);

    var payload = Buffer.concat([this.data, this.optionalData]);
    var payloadCrc = crc(payload);

    return Buffer.concat([
        new Buffer([0x55]),
        header,
        new Buffer([headerCrc]),
        payload,
        new Buffer([payloadCrc])
    ]);
};

module.exports = BasePacket;
