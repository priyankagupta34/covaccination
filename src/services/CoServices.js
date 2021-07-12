export const CoServices = {
    getOTPToRegister,
    confirmOTPToRegister,
    getStatesList,
    sha256Conversion,
    getAllDistricts,
    getSessionSlots,
    test,
    getTodaysDate,
    calenderByPin
}

// const headers = {
//     'Content-Type': 'text/plain'
// };

const axios = require('axios');
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'https://apps.healthifyme.com';
// const host_misc = 'https://covifit-assets.s3.ap-south-1.amazonaws.com/locales/en/translation.json';
const host = 'https://cdn-api.co-vin.in/api/v2/';

// let config = {
//     headers: {'Access-Control-Allow-Origin': '*'}
// };

function getOTPToRegister(mobile) {
    return axios.post(`${host}auth/public/generateOTP`, { mobile })
}

function confirmOTPToRegister(otp, txnId) {
    return axios.post(`${host}auth/public/confirmOTP`, { otp, txnId });
}

function getStatesList() {
    return axios.get(`${host}admin/location/states`);
}

function getSessionSlots(pincode, date) {
    return axios.get(`${host}appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`);
}
function test() {
    return axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=801503&date=11-07-2021');
}

async function sha256Conversion(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getAllDistricts(state_id) {
    return axios.get(`${host}admin/location/districts/${state_id}`);
}

function calenderByPin(pincode) {
    return axios.get(`${host}appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${getTodaysDate()}`);
}

function getTodaysDate(){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    return `${tomorrow.getDate().toString().padStart(2,'0')}-${(tomorrow.getMonth() + 1).toString().padStart(2,'0')}-${tomorrow.getFullYear()}`;
}