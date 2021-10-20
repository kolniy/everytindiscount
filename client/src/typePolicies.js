import { Todos } from "./state";
import { Auth } from "./state/auth"

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
            }
        }
    }
}

export default typePolicies