const Auther = require("../models/Auther")
const Book = require("../models/Book")
const AutherType = require("../types/AutherType")
const BookType = require("../types/BookType")
const UserType = require("../types/UserType")

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = require("graphql")


const Mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        addAuther: {
            type: AutherType,
            args: {
                name: { type: GraphQLString }
            },
            async resolve(_, args) {
                const auther = new Auther({
                    name: args.name
                })
                return await auther.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString },
                auther: { type: GraphQLID }
            },
            async resolve(_, args) {
                const book = new Book({
                    title: args.title,
                    auther: args.auther,

                })
                return await book.save();
            }
        },
        updateAuther: {
            type: AutherType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString }
            },
            resolve(_, args) {
                const auther = Auther.findByIdAndUpdate({
                    name: args.name
                }, { new: true })
                return auther;
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        author: {
            type: AutherType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(_, args) {
                return Auther.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AutherType),
            resolve() {
                return Auther.find();
            }
        },
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(_, args) {
                return Book.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return Book.find();
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})