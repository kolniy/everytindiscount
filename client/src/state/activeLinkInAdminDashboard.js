import { makeVar } from "@apollo/client";

export const adminNavbarActiveLink = makeVar(1)

const updateActiveLink = (action) => {
    const { type, payload } = action

    switch (type){
        case "UPDATE_ACTIVE_LINK" :
            {
                return adminNavbarActiveLink(payload)
            }
        default: {
            return adminNavbarActiveLink
        }    
    }
}

export default updateActiveLink