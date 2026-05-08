const express = require("express")
const mongoose = require("mongoose")
const { graphqlHTTP } = require("express-graphql")

const schema = require("./schema/schema")

const app = express();

mongoose.connect("mongodb://root:root@127.0.0.1:27017/test?authSource=admin")
    .then(() => {
        console.log("Connected to MongoDb")
    })
    .catch((error) => {
        console.error(error)
    })

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Server is listening at 4000")
})