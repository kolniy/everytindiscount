import { makeVar } from "@apollo/client";

export const Auth = makeVar({
    token:"",
    user:null,
    isAuthenticated: false
})

const authDispatch = (action) => {
    const { type, payload } = action

    switch (type) {
        case "USER_LOGIN":
        case "USER_SIGNUP": {
           return Auth({
               ...Auth(),
               ...payload
           })
        }
        case "USER_LOGOUT": {
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