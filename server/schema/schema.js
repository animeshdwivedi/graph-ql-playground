const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, //Graph QL Object
    GraphQLString, // Equivalent of String
    GraphQLSchema, // Creating Schema for GraphQL
    GraphQLID, //an ID of type VAR, that allows us to have both String or Numeric
    GraphQLList //This is to make a list type Graph list.
} = graphql;

//Dummy data
const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];
const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

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

//Author GraphQL Object
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
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})