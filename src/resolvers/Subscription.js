// import { PubSub } from 'graphql-subscriptions'
 
// const pubsub = new PubSub()
import { pubsub } from "../index"
 
 const transactionCreated = {
     subscribe : () => {
          return pubsub.asyncIterator(['TRANSACTION_CREATED'])
     }
 }

 const count = {
     subscribe: () => {
         let count = 0
         setInterval(() => {
            count++
            pubsub.publish('count_increment', {
                count: count
            })
         }, 1000)
         return pubsub.asyncIterator('count_increment')
     }
 }


 export { transactionCreated, count }