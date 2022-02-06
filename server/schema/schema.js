const authors = require('../models/author');
const books = require('../models/books');
const BookType = require('../schema/BookType');
const AuthorType = require('../schema/AuthorType');
const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, //Graph QL Object    
    GraphQLSchema, // Creating Schema for GraphQL
    GraphQLID, //an ID of type VAR, that allows us to have both String or Numeric
    GraphQLList //This is to make a list type Graph list.
} = graphql;


const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        /**
         * {
                book(id: 1){
                    name,
                    genre,
                    id,    
                }
            }
         */
        book: { 
            type: BookType, 
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {       
                //code to get data from database/datasource         
                return _.find(books,{id: args.id})
                
            }
        },
        /**
         * {
                author(id: 1){
                    name,
                    age,
                    id,    
                }
            }
         */
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return books;
            }
        },
        /* 
            Query:
                {
                    books {
                        name
                        genre
                        id
                        author {
                            name
                            id
                            age
                        }
                    }
                }            
        */
       /* 
            {    
                authors{
                    name,
                    age,
                    id,
                    book{
                        genre,
                        id,
                        name
                    }
                }
            }        
       */
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return authors;
            }
        }        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})