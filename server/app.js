const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //this is for the graphiql view online to test queries.
}));
app.listen(4000, () => {
    console.log('Listening to port 4000');
});