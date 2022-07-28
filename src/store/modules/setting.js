export default {
    namespaced: true,
    state:{
        isCollapse:false,
    },
    getters:{},
    mutations:{
        toggleCollapse(state){
            state.isCollapse=!state.isCollapse
        },
    },
    actions:{}
}