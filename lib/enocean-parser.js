'use strict';

var buffertools = require('buffertools'),
	crc = require('./crc');

function parser () {
	var state = 0,
		buffer,
		dataLength,
		optionalLength,
		totalLength;

	var parseMessage = function (buf) {

		// Look for start byte 0x55
		if (state === 0) {
			var start = buffertools.indexOf(buf, new Buffer([0x55]));

			// Stop parsing if startbyte is not found
			if (start === -1) {
				return;
			}

			buffer = buf.slice(start);

			state++;
		} else {
			buffer = Buffer.concat([buffer, buf]);
		}

		if (state === 1 && buffer.length >= 6) {
			var header = buffer.slice(1, 5);

			// If header CRC is not correct we probably have the
			// wrong startbyte. reset state and parse the rest.
			if (crc(header) !== buffer[5]) {
				state = 0;
				return parseMessage(buffer.slice(1));
			}

			dataLength = header.readUInt16BE(0);
			optionalLength = header.readUInt8(2);
			totalLength = 7 + dataLength + optionalLength;

			state++;
		}

		if (state === 2 && buffer.length >= totalLength) {
			var payload = buffer.slice(6, totalLength - 1);

			// If payload CRC is not correct we have a corrupt packet
			// Discard and parse next.
			if (crc(payload) !== buffer[totalLength - 1]) {
				state = 0;
				return parseMessage(buffer.slice(1));
			}

			state = 0;

			var packet = {
				type: buffer.readUInt8(4),
				data: buffer.slice(6, 6 + dataLength),
				optional: buffer.slice(6 + dataLength, 6 + dataLength + optionalLength)
			};

			var returns = [packet];

			if (buffer.length > totalLength) {
				var p = parseMessage(buffer.slice(totalLength));
				returns = returns.concat(p);
			}

			return returns;
		}
	};

	return function (emitter, buf) {
		var packets = parseMessage(buf);

		if (!Array.isArray(packets)) {
			return;
		}

		packets.forEach(function (packet) {
			emitter.emit('data', packet);
		});
	};
}

module.exports = parser;
