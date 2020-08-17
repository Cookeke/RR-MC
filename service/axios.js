import axios from 'axios';

// axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

export function Post(url, data = {}) {
    axios({
        method: 'post',
        url,
        data,
    }).then(response => {
        return Promise.resolve(response);
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function Get(url, params = {}) {
    axios({
        method: 'get',
        url,
        params,
    }).then(response => {
        return Promise.resolve(response);
    }).catch(error => {
        return Promise.reject(error);
    })
}
