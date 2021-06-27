import router from './index';
import bus from '../components/common/bus';
let permissions = [];
let whiteList = ['/403', '/login', '/dashbaord', '/404'];
bus.$on('allowMenu', e => {
    e.forEach(item => {
        if (item && item.subs && item.subs.length) {
            item.subs.forEach(it => {
                permissions.push(it.index);
            });
        }
    });
});

router.beforeEach((to, from, next) => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!permissions || !permissions.length) {
        try {
            let a = localStorage.getItem('permissions');
            permissions = JSON.parse(localStorage.getItem('permissions'));
        } catch (e) {}
    }

    if (user && user.info && user.info.type == 'SUPER_MANAGER') {
        next();
        return;
    }
    if (to.path == '/login') {
        next();
        return;
    }
    if (to.path == '/register') {
        next();
        return;
    }
    if (!user) {
        next({ path: '/login' });
        return;
    }
    if (whiteList.indexOf(to.path) > -1) {
        next();
        return;
    }
    if (permissions.join(',').indexOf(to.path) == -1) {
        if (permissions && permissions.length) {
            next({ path: permissions[0] });
        } else {
            next({ path: '/403' });
        }
        return;
    }
    next();
});
