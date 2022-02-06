const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, //Graph QL Object
    GraphQLString, // Equivalent of String
    GraphQLSchema, // Creating Schema for GraphQL
    GraphQLID, //an ID of type VAR, that allows us to have both String or Numeric
} = graphql;

//Dummy data
const books = [{name: 'Book 1', id : '1'},{name: 'Book 2', id : '2'},{name: 'Book 3', id : '3'}]
const authors = [{name: 'Author 1', id : '1'},{name: 'Author 2', id : '2'},{name: 'Author 3', id : '3'}]

//Book GraphQL Object
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        name: {type: GraphQLString},
        id: {type: GraphQLID},        
    })
});

//Author GraphQL Object
const AuthorType = new GraphQLObjectType({
    name: 'Author', 
    fields: () => ({
        name: {type: GraphQLString},
        id: {type: GraphQLID},        
    })
});

const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        book: { 
            type: BookType, 
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {       
                //code to get data from database/datasource         
                return _.find(books,{id: args.id})
                
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})