import { Todos } from "./state";
import { Auth } from "./state/auth"
import { adminNavbarActiveLink } from "./state/activeLinkInAdminDashboard";

const typePolicies = {
    Query: {
        fields: {
            Todos: {
                read(){
                    return Todos()
                }
            },
            Auth: {
                read(){
                    return Auth()
                }
            },
            adminNavbarActiveLink: {
                read(){
                    return adminNavbarActiveLink()
                }
            }
        }
    }
}

export default typePolicies