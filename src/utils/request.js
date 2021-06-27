import axios from 'axios';
import router from '../router/index';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL: '/manage/',
    timeout: 0
});
import { Message } from 'element-ui';

service.interceptors.request.use(
    config => {
        try {
            config.headers['accessToken'] = JSON.parse(localStorage.getItem('user')).token;
        } catch (e) {}
        config.headers['platform'] = 'MANAGER';
        return config;
    },
    error => {
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code == 200 || response.data.code == 204) {
                return response.data.data;
            } else if (response.data.code == 401) {
                Message.error({
                    message: '登录已失效',
                    type: 'error'
                });
                localStorage.removeItem('user');
                localStorage.removeItem('permissions');
                router.push({ path: '/login' });
            } else if (response.data.code == 403) {
                // router.push({ path: '/403' });
                Message.error({ message: '没有权限', type: 'error' });
                return Promise.reject(response.data);
            } else {
                Message.error({
                    message: response.data.msg,
                    type: 'error'
                });
                return Promise.reject(response.data);
            }
        } else {
            return Promise.reject();
        }
    },
    error => {
        Message.error({
            message: error,
            type: 'error'
        });
        return Promise.reject();
    }
);

export default service;
