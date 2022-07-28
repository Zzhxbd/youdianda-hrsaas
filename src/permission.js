import { getToken } from '@/utils/auth'
import router from '@/router'
import store from '@/store'
const whiteList = ['/404', '/login']
router.beforeEach(async(to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next('/')
        } else {
            if(!store.getters['user/userId']){
                await store.dispatch('user/getUserProfileAction')
            }
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})
