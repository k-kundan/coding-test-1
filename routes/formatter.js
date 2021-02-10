const express = require('express');

const router = express.Router();

const isExist = (str, refData) => {
    if (str.includes("{REF_IMSI}")) {
        return str.replace("{REF_IMSI}", refData["REF_IMSI"]);
    } else if (str.includes("{REF_MSISDN}")) {
        return str.replace("{REF_MSISDN}", refData["REF_MSISDN"]);
    } else if (str.includes("{REF_SERVPROFID}")) {
        return str.replace("{REF_SERVPROFID}", refData["REF_SERVPROFID"]);
    } else {
        return str
    }
}

router.post(
    '/',
    async (req, res, next) => {
        try {

            let refData = req.body.referenceData;
            let responseObj = {
                name: req.body.payload.name,
                valueType: req.body.payload.valueType
            };

            responseObj.value = req.body.payload.value.map((item) => {
                let obj = {};
                if (Array.isArray(item.value)) {
                    obj.name = item.name;
                    obj.valueType = item.valueType;
                    obj.value = item.value.map(val => {
                        let o = {};
                        if (Array.isArray(val.value)) {
                            o.name = val.name;
                            o.valueType = val.valueType;
                            o.value = val.value.map((v) => {
                                let ss = {};
                                if (Array.isArray(v.value)) {
                                    ss.name = v.name;
                                    ss.valueType = v.valueType;
                                    v.value.map((ii) => {
                                        ii.name = ii.name;
                                        ii.valueType = ii.valueType;
                                        ii.value = isExist(ii.value, refData)
                                        return ii
                                    })
                                }

                                ss.name = v.name;
                                ss.valueType = v.valueType;
                                ss.value = isExist(v.value, refData)
                                return ss

                            });
                            return o;
                        }

                        o.name = val.name;
                        o.valueType = val.valueType;
                        o.value = isExist(val.value, refData);
                        return o;
                    })
                    return obj
                }

                obj.name = item.name;
                obj.valueType = item.valueType;
                obj.value = isExist(item.value, refData);
                return obj

            });

            res.status(200).json(responseObj);
        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;