var crc = require('./crc');
var binary = require('binary');
var SerialPort = require('serialport').SerialPort;



var GW = function(port, callback) {
  var parseIndex = 0
  , msg = {
    data_length: 0, 
    optional_data_length: 0,
    packet_type: 0,
    data: [],
    optional_data_length: []
  } 
  , buffer = [];

  var enocean = this;

  this.PACKET_TYPES = {
    RADIO: 0x01,
    RESPONSE: 0x02
  };

  this.sp = new SerialPort(port, {
    baudrate: 57600,
    buffersize: 1
  });

  this.sp.on('data', function(data) {
    if ((parseIndex == 0) && (data[0] == 0x55)) {
      msg = {
        header: {
          data_length: 0, 
          optional_data_length: 0,
          packet_type: 0
        },
        data: [],
        optional_data: []
      }
      parseIndex += 1;
    }
    else if ((parseIndex < 5) && (parseIndex > 0)) {
      buffer.push(data[0]);
      parseIndex += 1;
    }
    else if ((parseIndex == 5)) {
      if (crc.crc8(buffer) == data[0]) {

        header = binary.parse(buffer)
        .word16bu('data_length')
        .word8('optional_data_length')
        .word8('packet_type')
        .vars
        ;

        msg.header = header;

        buffer = [];
        parseIndex += 1;
      }
      else {
        buffer = [];
        parseIndex = 0;
      }
    }
    else if ((parseIndex > 5) && (parseIndex <= 5 + msg.header.data_length + msg.header.optional_data_length)) {
      buffer.push(data[0]);
      parseIndex += 1;
    }
    else {


      if (crc.crc8(buffer) == data[0]) {
        msg.data = buffer.slice(0, msg.header.data_length);
        msg.optional_data = buffer.slice(msg.header.data_length, msg.header.data_length + msg.header.optional_data_length);

        msg = parseGenericMessage(msg);

        callback(msg);
      }
      buffer = [];
      parseIndex = 0;
    }
  });
}

GW.prototype.addProfile = function(func, type, msg, callback) {
    if (func == 0x02) {
      if (type == 0x05) {
        t = 40.0 - ((40.0 /255.0)*msg.data.data[2]);
        returnObject = {SenderId: msg.data.senderId, Value: t};
        callback(returnObject);
      }
    }

};

parseGenericMessage = function(genericMsg) {
  switch(genericMsg.header.packet_type) {
    case 0x01:
    genericMsg = parseRadioMessage(genericMsg);
    break;
    case 0x02:
    genericMsg = parseResponseMessage(genericMsg);
    break;
  }
  return genericMsg;
}

parseRadioMessage = function(radioMsg) {

  idbuffer = radioMsg.data.slice(-5,-1);
  id = binary.parse(idbuffer).word32bu('SenderId').vars;

  var data = {
    rorg: radioMsg.data[0],
    data: radioMsg.data.slice(1,-5),
    senderId: id.SenderId,
    status: radioMsg.data[radioMsg.header.data_length -1]
  }
  radioMsg.data = data;
  /*
  if radioMsg.data.rorg == 0xf6 {
    parse
  }
  */
  return radioMsg;
}

parseResponseMessage = function(responseMsg) {
  return responseMsg;
}

module.exports = {
  GW: GW
};