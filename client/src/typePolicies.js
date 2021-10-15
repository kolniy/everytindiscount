import { Todos } from "./state";

const typePolicies = {
    Query: {
        fields: {
            Todos: {
                read(){
                    return Todos()
                }
            }
        }
    }
}

export default typePolicies