import { LOGIN, LOGOUT } from "./actions"

const init = {isLoggedIn:false,user:null} 
const authReducer = (state = init,{type,payload}) => {
    switch(type){
        case LOGIN:
            return {isLoggedIn:true,user:payload};
        case LOGOUT:
            return {isLoggedIn:false,user:null};
        default:
            return state;
    }
}

export default authReducer;