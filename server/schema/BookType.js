const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, //Graph QL Object
    GraphQLString, // Equivalent of String    
    GraphQLID, //an ID of type VAR, that allows us to have both String or Numeric    
} = graphql;

//Book GraphQL Object
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        name: {type: GraphQLString},
        genre: {type: GraphQLString},    
        id: {type: GraphQLID},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return(_.find(authors, {id: parent.authorId}))
            }
        }        
    })
});

module.exports = BookType
//This is done to avoid the circular dependencies 
const authors = require('../models/author');
const AuthorType = require('../schema/AuthorType')