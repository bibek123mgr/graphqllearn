const { GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLObjectType } = require("graphql")


const BookType = new GraphQLObjectType({
    name: "BookInput",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        
    })
})

module.exports=BookType