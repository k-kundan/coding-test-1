'use strict';

const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

const data = {
    "payload": {
        "name": "subscriber",
        "valueType": "array",
        "value": [{
                "name": "MN",
                "valueType": "string",
                "value": "{REF_MSISDN}"
            },
            {
                "name": "IM",
                "valueType": "string",
                "value": "{REF_IMSI}"
            },
            {
                "name": "NT",
                "valueType": "string",
                "value": "G"
            },
            {
                "name": "privateUser",
                "valueType": "array",
                "value": [{
                        "name": "privateUserId",
                        "valueType": "string",
                        "value": "{REF_IMSI}@ims.mnc001.mcc505.3gppnetwork.org"
                    },
                    {
                        "name": "roamingAllowed",
                        "valueType": "string",
                        "value": "false"
                    },
                    {
                        "name": "publicUser",
                        "valueType": "array",
                        "value": [{
                                "name": "publicIdValue",
                                "valueType": "string",
                                "value": "sip:{REF_IMSI}@ims.mnc001.mcc505.3gppnetwork.org"
                            },
                            {
                                "name": "implicitRegSet",
                                "valueType": "string",
                                "value": "1"
                            },
                            {
                                "name": "serviceProfileId",
                                "valueType": "string",
                                "value": "{REF_SERVPROFID}"
                            },
                            {
                                "name": "testUser",
                                "valueType": "array",
                                "value": [{
                                        "name": "testIdValue",
                                        "valueType": "string",
                                        "value": "sip:{REF_IMSI}@ims.mod-connect.com"
                                    },
                                    {
                                        "name": "implicitRegSet",
                                        "valueType": "string",
                                        "value": "2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "userImsi",
                        "valueType": "string",
                        "value": "{REF_IMSI}"
                    }
                ]
            },
            {
                "name": "PO",
                "valueType": "string",
                "value": "0"
            }
        ]
    },
    "referenceData": {
        "REF_MSISDN": "0406679321",
        "REF_IMSI": "50002312344314",
        "REF_SERVPROFID": "2"
    }
}


describe('functional - formatter', () => {

    it('should fail to format payload', async () => {

        const res = await request(app).post('/').send(data);
        expect(res.status).to.equal(400);
    });

    it('should format payload', async () => {

        const res = await request(app).post('/').send(data);
        expect(res.status).to.equal(200);
    });
});