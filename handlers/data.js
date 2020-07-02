const { generateSignature, processReturnData } = require('../util/validators');

const qs = require('querystring');

const { paymentUrl, concat_request_data } = require('../util/constants');

//// I mainly use axios for requests, you can use anything that you like
//// Remember to add the headers and stringify you request!
//// It will not accept your payment if you forgot to do so.
const axios = require('axios')

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

firebase.initializeApp(config);

exports.payment = (request, response) => {
    let requestData = {...request.body, ...concat_request_data};

    requestData.signature = generateSignature(requestData);

    axios
        .post(paymentUrl, qs.stringify(requestData), config)
        .then(res => {
            return response.json(processReturnData(res.data));
        })
        .catch(error => {
            return response.json(error)
        })
}