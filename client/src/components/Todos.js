import React, { useState } from 'react'
import { Input, Container, ListGroup, ListGroupItem } from 'reactstrap'
import dispatch from '../state'
import { useQuery, gql } from '@apollo/client'

const GET_TODOS = gql`
    query {
        Todos @client
    }
`

export const Todos = () => {

    const [ val, setVal ] = useState('')
    const { data } = useQuery(GET_TODOS)

    const setState = (e) => {
        if(e.key === "Enter"){
            dispatch({
                type: "ADD_TODO",
                todo: {
                    id: Date.now(),
                    text: val,
                    completed: false
                }
            })
            setVal('')
        }
    }

    const completeTodo = (todo) => {
        dispatch({
            type:"COMPLETE_TODO",
            todo: {
                ...todo
            }
        })
    }

    const deleteTodo = (todo) => {
        dispatch({
            type:"DELETE_TODO",
            todo
        })
    }

    return <>
        <Container fluid style={{ width:'60%', height:'fit-content', padding:'30px'}} className="shadow mt-6">
            <Input
             className="mt-3 mb-3 mt-1"
             type="text" 
             value={val}
             onChange={e => setVal(e.target.value)}
             onKeyDown={e => setState(e)}
             placeholder="Add Todo"
              />

              {
                 data.Todos.map((todo) => {
                     return  <ListGroup key={todo.id}>
                     <ListGroupItem 
                     style={{
                         display:'flex',
                         justifyContent:'space-between'
                     }}> 
                         {
                             todo.completed === false ? <p onClick={e => completeTodo(todo)}>{todo.text}</p> : <strike><p onClick={e => completeTodo(todo)}>{todo.text}</p></strike>
                         }
                         <p onClick={e => deleteTodo(todo)} style={{cursor:'pointer'}}>x</p>
                     </ListGroupItem>
                 </ListGroup>
                 })
              }
        </Container>
    </>
}

export default Todos