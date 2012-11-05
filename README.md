#Install

npm install git://github.com/iUtvikler/Enocean.js.git#master

#Use:

	var Enocean = require('Enocean');

	var enoceanGW = new Enocean.GW('/dev/tty.usbserial-FTVBI8RQ',function(msg){
  		enoceanGW.addProfile(0x02, 0x05, msg, function(rslt) {
    		console.log("Sensor " + rslt.SenderId + " measured a temperature of " + rslt.Value);
  		});
	});