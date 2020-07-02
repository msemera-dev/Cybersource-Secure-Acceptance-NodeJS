const hmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');

//// Add your SECRET_KEY from Cybersouce
const SECRET_KEY = ''

//// Instead of using only 'new Date()' to generate your dates, 
//// you will need to manipulate it to show 0 to 19 digits only
//// Your access will be denied if you only use new Date() 
//// since it produces one extra string
exports.dateString = () => {
    var d = new Date();
    d = d.toISOString();
    return d.substring(0, 19) + 'Z';
};



//// DOCUMENTATION LINK = https://developer.cybersource.com/library/documentation/dev_guides/Secure_Acceptance_Hosted_Checkout/Secure_Acceptance_Hosted_Checkout.pdf
//// CLICK ON PHP AND YOU WILL BE ABLE TO DOWNLOAD THEIR SAMPLE
//// THIS IS THE ORIGINAL CODE OF MAKING A SIGNATURE
// <?php
// define ('HMAC_SHA256', 'sha256');
// define ('SECRET_KEY', '<REPLACE WITH SECRET KEY>');
// function sign ($params) {
//   return signData(buildDataToSign($params), SECRET_KEY);
// }
// function signData($data, $secretKey) {
//     return base64_encode(hash_hmac('sha256', $data, $secretKey, true));
// }
// function buildDataToSign($params) {
//         $signedFieldNames = explode(",",$params["signed_field_names"]);
//         foreach ($signedFieldNames as $field) {
//            $dataToSign[] = $field . "=" . $params[$field];
//         }
//         return commaSeparate($dataToSign);
// }
// function commaSeparate ($dataToSign) {
//     return implode(",",$dataToSign);
// }
// ?>

/// THIS IS THE TRANSLATION FROM CYBERSOURCE'S DOCUMENTATION
exports.generateSignature = (dataObj) => {
    let data = []
    let imploded = '';
    // you will only generate a signature based on the parameters inside signed_field_names
    // you will see these fields in '..util/constants'
    let signedData = dataObj.signed_field_names

    // convert the string from signed_field_names to array
    let signedArr = signedData.split(',');

    // once fields from signed_field_names became an array,
    // you will now assign these fields to their value
    // it is important that the signed_field_names is the same value from your request body
    signedArr.forEach(field => {
        data.push(field + '=' + dataObj[field]);
    });

    // this function will revert it back to string format with their respective values
    imploded = data.join();

    //this will return the signature that will be used to validate your payment
    return Base64.stringify(hmacSHA256(imploded, SECRET_KEY));
}



//// This will process the return date from https://testsecureacceptance.cybersource.com/silent/pay
//// Since they return a whole new page composed of HTML, 
//// this will help to convert them into JSON format
exports.processReturnData = (data) => {
    let ret = {};
    let payload = {};
    data.split('<input type=\"hidden\" name=\"').forEach((c) => {
        [key, payload[key]] = c.split('\" id=\"');
    });
    let i = 0;
    Object.keys(payload).map(key => {
        if (i == 0) {
            delete payload[key]
        } else {
            ret[key] = payload[key].split(key + '" value="')[1].replace('\" />\n        ', '');
            if (Object.keys(payload).length === i) {
                ret[key] = payload[key].split(key + '" value="')[1].replace("\" />\n    <noscript>\n        <p>Your browser does not support JavaScript. Click the button below to continue.</p>\n        <input type=\"submit\" name=\"commit\" value=\"Continue\" data-disable-with=\"Continue\" />\n    </noscript>\n</form><script type=\"text/javascript\">\n    window.onload = function(){\n        document.forms['custom_redirect'].submit();\n    }\n</script>\n</body>\n</html>\n", '');
            }
        }
        i += 1;
    });
    return ret
}