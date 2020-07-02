const { dateString } = require('../util/validators');

//// Insert your unique keys and id from your cybersource account
const SECRET_KEY = '';
const ACCESS_KEY = '';
const PROFILE_ID = '';

const paymentUrl = 'https://testsecureacceptance.cybersource.com/silent/pay';

const concat_request_data = {
    access_key: ACCESS_KEY,
    profile_id: PROFILE_ID,
    signed_field_names: "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,card_cvn,bill_to_company_name,bill_to_address_line2",
    unsigned_field_names: "card_type,card_number,card_expiry_date",
    transaction_type: "sale",
    payment_method: "card",
    currency: "PHP",
    locale: "en",
    transaction_uuid: Math.floor(Math.random() * 100000000),
    signed_date_time = dateString()
};

module.exports = { SECRET_KEY, paymentUrl, concat_request_data };