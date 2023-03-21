/* eslint-disable */
const jwt = require( 'jsonwebtoken' );

const config = 'secretKey';

const verifyToken = ( req, res, next ) => {
  console.log(req.body, req.headers)
  const tokensep = req.headers.token.split(' ')
  console.log(tokensep)
  console.log(tokensep[1])
    const token = req.body.token || req.query.token || tokensep[1];

    if ( !token ) {
        return res.status( 403 ).send( 'A token is required for authentication' );
    }
    try {
      console.log("this is token", token)
        const decoded = jwt.verify( token, config );

        console.log("hello",decoded)

        req.user = decoded;
    }
    catch ( err ) {
        return res.status( 401 ).send( 'Invalid Token' );
    }
    return next();
};

module.exports = verifyToken;
