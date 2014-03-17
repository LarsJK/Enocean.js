'use strict';

var assert = require('assert'),
	parser = require('../lib/enocean-parser')();

describe('EnoceanParser', function () {
	var emitter;

	beforeEach(function () {
		emitter = {
			done: null,
			expectedPackets: 1,
			recievedPacket: 0,
			packetRecieved: function () {
				this.recievedPacket++;
				if (this.recievedPacket === this.expectedPackets) {
					this.done();
				}
			},
			emit: function (event, packet) {
				assert.equal(packet.typeId, 0x05);
				assert.deepEqual(packet.data, new Buffer([0x02]));
				assert.deepEqual(packet.optional, new Buffer([0x07]));
				this.packetRecieved();
			}
		};
	});

	it('should emit buffer', function (done) {
		var buf = new Buffer([0x55, 0x00, 0x01, 0x01, 0x05, 0x65, 0x02, 0x07, 0x3F]);

		emitter.done = done;

		parser(emitter, buf);
	});

	it('should handle partial messages', function (done) {
		var buf1 = new Buffer([0xFF, 0x55, 0x00, 0x01]);
		var buf2 = new Buffer([0x01, 0x05, 0x65, 0x02, 0x07, 0x3F]);

		emitter.done = done;

		parser(emitter, buf1);
		parser(emitter, buf2);
	});

	it('should handle wrong start bytes', function (done) {
		var buf = new Buffer([0x55, 0x55, 0x00, 0x01, 0x01, 0x05, 0x65, 0x02, 0x07, 0x3F]);

		emitter.done = done;

		parser(emitter, buf);
	});

	it('should handle more than one packet', function (done) {
		var buf = new Buffer([
			0x55, 0x00, 0x01, 0x01, 0x05, 0x65, 0x02, 0x07, 0x3F,
			0x55, 0x00, 0x01, 0x01, 0x05, 0x65, 0x02, 0x07, 0x3F
		]);

		emitter.done = done;
		emitter.expectedPackets = 2;

		parser(emitter, buf);
	});
});
