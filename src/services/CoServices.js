export const CoServices = {
    getAllMiscInfo,
    getAllStates
}

// const headers = {
//     'Content-Type': 'text/plain'
// };

const axios = require('axios');
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'https://apps.healthifyme.com';
const host_misc = 'https://covifit-assets.s3.ap-south-1.amazonaws.com/locales/en/translation.json';
const host = 'https://www.healthifyme.com/api/v1/cowin/';

function getAllMiscInfo(){
    return axios.get(host_misc);
}

function getAllStates(){
    return axios.get(`${host}states?language=en`, {headers:{
        Accept: 'application/json',
       'Content-Type': 'application/json'}});
}