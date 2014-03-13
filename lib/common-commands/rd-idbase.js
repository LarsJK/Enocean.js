'use strict';

var util = require('util'),
    BaseCommonCommandPacket = require('./base-common-command-packet');

function RdIdbase() {
    RdIdbase.super_.call(
        this,
        RdIdbase.code
    );

    return this;
}

util.inherits(RdIdbase, BaseCommonCommandPacket);

RdIdbase.code = 8;

module.exports = RdIdbase;
