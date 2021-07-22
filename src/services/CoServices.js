export const CoServices = {
    getOTPToRegister,
    confirmOTPToRegister,
    getStatesList,
    sha256Conversion,
    getAllDistricts,
    getSessionSlots,
    test,
    getTodaysDate,
    calenderByPin,
    calenderByDistrict,
    getBeneficiaries,
    getIDTypes,
    getRightDateFromCowinFormat,
    checkDateDifference,
    checkIfAgeIsElibleAsperSlot,
    checkNumberOfDaysLeftforDose2,
    downloadCertificate
}

// const headers = {
//     'Content-Type': 'text/plain'
// };

const moment = require('moment');

const axios = require('axios');
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'https://apps.healthifyme.com';
// const host_misc = 'https://covifit-assets.s3.ap-south-1.amazonaws.com/locales/en/translation.json';
const host = 'https://cdn-api.co-vin.in/api/v2/';

// let config = {
//     headers: {'Access-Control-Allow-Origin': '*'}
// };

function getOTPToRegister(mobile) {
    return axios.post(`${host}auth/generateMobileOTP`, { mobile, secret: "U2FsdGVkX1+Qv4iGD8jOlYu6INWkBe3zw0OBN7IRQWo+mMcXKQo96YvfIzJi7XAOGV295AKaBfIaH3NY0XgFYw==" }, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        }
    })
}

function confirmOTPToRegister(otp, txnId) {
    return axios.post(`${host}auth/validateMobileOtp`, { otp, txnId }, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        }
    });
}

function getStatesList() {
    return axios.get(`${host}admin/location/states`);
}

function getBeneficiaries(token) {
    return axios.get(`${host}appointment/beneficiaries`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
}

function getIDTypes() {
    return axios.get(`${host}registration/beneficiary/idTypes`);
}


function getSessionSlots(pincode, date) {
    return axios.get(`${host}appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`);
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

function calenderByDistrict(district_id) {
    return axios.get(`${host}appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${getTodaysDate()}`);
}

function getTodaysDate(date = new Date(), days = 1) {
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + days);
    return `${tomorrow.getDate().toString().padStart(2, '0')}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getFullYear()}`;
}

function getRightDateFromCowinFormat(date) {
    date = date.split('-');
    return date[1] + '-' + date[0] + '-' + date[2];
}

function checkDateDifference(date1, date2) {
    return Date.parse(date1) <= Date.parse(date2);
}

function checkIfAgeIsElibleAsperSlot(applicable_for_all_ages, minAge, max_age, birth_year) {
    const currentYear = new Date().getFullYear();
    birth_year = parseInt(birth_year);
    const diff = currentYear - birth_year;
    if (applicable_for_all_ages) {
        if (diff >= minAge) return true;
        else return false;
    } else {
        if (max_age === undefined) {
            if (diff >= minAge) return true;
            else return false;
        } else {
            if (diff >= minAge && diff <= max_age) {
                return true;
            } else return false;
        }
    }
}

function checkNumberOfDaysLeftforDose2(dateOf1stVaccin, eligibleDay = 84) {
    const startDate = moment(dateOf1stVaccin, "DD.MM.YYYY");
    const endDate = moment(getTodaysDate(), "DD.MM.YYYY");
    const daysThatRemain = endDate.diff(startDate, 'days');
    return (eligibleDay + 1) - daysThatRemain;
}

function test() {
    getTodaysDate();
}

function downloadCertificate(beneficiary_reference_id, token){
    return axios.get(`${host}registration/certificate/download?beneficiary_reference_id=${beneficiary_reference_id}`, {
        reponseType: "arraybuffer",
        responseEncoding: "binary",
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/pdf'
        }
    });
}
