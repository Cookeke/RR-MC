import * as _axios from './axios'

const url = 'https://rrweb.jd.com/user';

// 创建用户数据
export const createUserData = data => {
    return _axios.Post(
        `${url}/createUserData`,
        data
    )
}

// 获取用户数据
export const getUserData = data => {
    return _axios.Post(
        `${url}/getUserData`,
        data
    )
}

// 获取用户数据
export const downloadOssUrl = params => {
    return _axios.Get(
        `${url}/download?ossUrl=url`,
        params
    )
}
