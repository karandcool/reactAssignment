const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const helmet = require( 'helmet' ),
    app = express();
const { setRoutes } = require( './routes' );
// For security

app.use( helmet() );

const cors = require( 'cors' ),
    // Allow Origins according to your need.
    corsOptions = {
        'origin': '*'
    };

app.use( cors( corsOptions ) );

app.use( bodyParser.json() );

// Setting up Routes
setRoutes( app );

module.exports = { app };
