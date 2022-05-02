// Actions
export const LOGIN  = "LOGIN";
export const LOGOUT = 'LOGUT';


// Action creator

const login = (user) => {
    return {
        type:LOGIN,
        payload:user
    }
}

const logout = () => {
    return {
        type:LOGOUT
    }
}

export {login,logout};