const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//Dummy data
const books = [{name: 'Book 1', id : '1'},{name: 'Book 2', id : '2'},{name: 'Book 3', id : '3'}]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
    })
});

const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { 
            type: BookType, 
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {       
                //code to get data from database/datasource         
                _.find(books,{id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})