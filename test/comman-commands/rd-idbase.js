'use strict';

var should = require('should'),
    RdIdbase = require('../../lib/common-commands/rd-idbase.js');

describe('RdIdbase', function () {

    beforeEach(function () {
        this.packet = new RdIdbase();
    });

    describe('constructor', function () {

        it('should return self with set properties', function () {
            this.packet.typeId.should.equal(0x05, 'typeId');

            this.packet.data.toString()
                .should.equal(new Buffer([8]).toString(), 'data');
        });
    });
});
