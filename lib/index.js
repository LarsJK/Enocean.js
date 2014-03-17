'use strict';

var SerialPort = require('SerialPort').SerialPort,
    parser = require('./enocean-parser'),
    RdIdbase = require('./common-commands/rd-idbase'),
    factory = require('./packet-factory');

var sp = new SerialPort('/dev/tty.usbserial-FTVBI8RQ', {
	baudrate: 57600,
	parser: parser()
});

sp.on('data', function (data) {
    data = factory(data);
	console.log(data);
});

sp.on('open', function () {
    sp.write(new RdIdbase().serialize());
});
