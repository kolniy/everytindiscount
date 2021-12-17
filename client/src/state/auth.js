import { makeVar } from "@apollo/client";

export const Auth = makeVar({
    token:"",
    user:null,
    isAuthenticated: !!localStorage.getItem("token")
})

const authDispatch = (action) => {
    const { type, payload } = action

    switch (type) {
        case "USER_LOGIN":
        case "USER_SIGNUP":
        case "USER_AUTHENTICATED":
        {
           return Auth({
               ...Auth(),
               ...payload
           })
        }
        case "USER_LOGOUT": {
            localStorage.removeItem('token')
            return Auth({
                ...Auth(),
                ...{
                    token:"",
                    user:null,
                    isAuthenticated:false
                }
            })
        }
        default: {
            return Auth()
        }
    }
}

export default authDispatch