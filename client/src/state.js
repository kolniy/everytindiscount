import { makeVar } from "@apollo/client";

export const Todos = makeVar([])

if(localStorage.getItem("todos")){
    Todos(JSON.parse(localStorage.getItem("todos")))
}

const dispatch = (action) => {
    const { type, todo } = action
        switch (type) {
            case "ADD_TODO": {
                localStorage.setItem('todos', JSON.stringify([...Todos(), todo]))
             return Todos([...Todos(), todo])
            }
            case "UPDATE_TODO": {
                const { id, text } = todo
                const newState = Todos().map((todo) => {
                    if(todo.id === id){
                        return {
                            ...todo,
                            text
                        }
                    } else {
                        return todo
                    }
                })

                localStorage.setItem("todos", JSON.stringify([...newState]))
                return Todos(newState)
            }  
            case "COMPLETE_TODO" : {
                const completed = !todo.completed

                const { id } = todo
                const newState = Todos().map((todo) => {
                    if(todo.id === id){
                        return {
                            ...todo,
                            completed
                        }
                    } else {
                        return todo
                    }
                })

                localStorage.setItem("todos", JSON.stringify([...newState]))
                return Todos(newState)
            }
            case "DELETE_TODO": {
                const { id } = todo
                const newState = Todos().filter((todo) => todo.id !== id)
                localStorage.setItem("todos", JSON.stringify([...newState]))

                return Todos(newState)
            }
            default: {
                return  Todos()
            }
        }
}

export default dispatch 
