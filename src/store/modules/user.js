import {getUserProfileApi, loginApi} from '@/api/User'
import {setToken,getToken,removeToken} from '@/utils/auth'
export default {
    namespaced: true,
    state:{
        token:getToken(),
        userInfo:{}   
    },
    mutations:{
        setToken(state,data){
            this.token=data
            setToken(data)
        },
        
        setUserInfo(state,data){
            state.userInfo=data
        },
        removeToken(state){
            state.token=null
            removeToken()
        }
    },
    getters:{
        userId:state=>state.userInfo.id,
        name:state=>state.userInfo.name
    },
    actions:{
        async loginAction(context,data){
          const res= await loginApi(data)
              // console.log(context);
              context.commit('setToken',res.token)
          },
          async getUserProfileAction (context){
              const {userInfo}=await getUserProfileApi()
              context.commit('setUserInfo',userInfo)
            //   console.log(userInfo);
          },
          quitOut(context){
              context.commit('removeToken')
              context.commit('setUserInfo',{})
          }
      },
}