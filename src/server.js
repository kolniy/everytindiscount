import path from "path"
import express from "express"
import usersRoute from "./routes/user"

const app = express()
const PORT = process.env.PORT || 6000


app.get('/', (req, res) => res.send("welcome to everytindiscount. this is our official API") )

app.use(express.json({ extended: false }))

app.use('/users', usersRoute)

if(process.env.NODE_ENV === 'production'){
    // serve the static files
    app.use(express.static('client/build'))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))