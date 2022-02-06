const graphql = require('graphql');
const _ = require('lodash');


const {
    GraphQLObjectType, //Graph QL Object
    GraphQLString, // Equivalent of String    
    GraphQLID, //an ID of type VAR, that allows us to have both String or Numeric
    GraphQLList //This is to make a list type Graph list.
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author', 
    fields: () => ({
        name: {type: GraphQLString},
        age: {type: GraphQLString},        
        id: {type: GraphQLID},        
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }        
    })
});

module.exports = AuthorType;
//This is done to avoid the circular dependencies
const books = require('../models/books');
const BookType = require('../schema/BookType')