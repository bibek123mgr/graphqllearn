const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const BookType = require("./BookType");
const Book = require("../models/Book");
const AutherType = new GraphQLObjectType({
    name: "AutherType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({auther:parent.id})
            }
        }

    })
})

module.exports = AutherType