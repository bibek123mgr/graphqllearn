const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require("graphql");

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString }
    })
})

module.exports=UserType