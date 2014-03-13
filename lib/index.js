'use strict';

var SerialPort = require('SerialPort').SerialPort,
    parser = require('./enocean-parser'),
    rdIdbase = require('./common-commands/rd-idbase');

var sp = new SerialPort('/dev/tty.usbserial-FTVBI8RQ', {
	baudrate: 57600,
	parser: parser()
});

sp.on('data', function (data) {
	console.log(data);
});

sp.on('open', function () {
    sp.write(new rdIdbase().serialize());
});
