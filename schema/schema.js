const graphql = require('graphql');
const User = require('../models/User');

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema
} = graphql


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find();
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                const user = new User({
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                return await user.save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id:{type:GraphQLID},
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                const user = await User.findByIdAndUpdate(args.id, {
                    name : args.name,
                    email : args.email,
                    age : args.age
                },{new:true});

                return user;
            }
        },
        deleteUser:{
            type:UserType,
            args:{
                id:{type:GraphQLID}
            },
            async resolve(parent,args){
                const user=await User.findByIdAndDelete(args.id)
                return user;
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

// mutation{
//   createUser(name:"Bibek Bakabal",email:"bibekmagar746@gmail.com",age:24){
//     id,
//     name,
//     email,
//     age
//   }
//   updateUser(id:"69fe0eee05d17b0d7e36ef46",name:"bibek magar",email:"bakabalbibekkumar@gmail.com",age:24){
//     id,
//     name,
//     age
//   },
// 		deleteUser(id:"69fe0eee05d17b0d7e36ef46"){
//     id
//   }
// }

// query{
//   users {
//     id,
//     name,
//     email,
//     age
//   }
// }

// query{
//   user(id:"69fe0eee05d17b0d7e36ef46"){
//       id,
//     name,
//     email,
//     age
//   }
// }