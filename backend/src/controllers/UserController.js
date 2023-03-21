/* eslint-disable */
const autoBind = require( 'auto-bind' );
const jwt = require("jsonwebtoken")
const { UserService } = require( '../services/UserService' );
const { User } = require( './../models/User' );
const bcrypt = require( 'bcrypt' );
const secretKey = "secretKey"
const userService = new UserService(
    new User().getInstance()
);

class UserController {
    constructor( service ) {
        this.service = service;
        autoBind( this );
    }

    async getAll( req, res, next ) {
        try {
            const response = await this.service.getall( req.query );

            // console.log( response );

            await res.status( response.statusCode ).json( response );
        }catch ( e ) {
            next( e );
        }
    }
    async getDetail( req, res, next ) {
        try {
           
            const response = await this.service.getall( { email : req.body.email } );

            console.log( response );
            console.log(req.body)

            if (response.data.length> 0 && (await bcrypt.compare( req.body.password, response.data[0].password ))) {
                // Create token
                const token = jwt.sign(
                  { user_id:  response.data[0].id , email:response.data[0].email },
                  secretKey,
                  
                );
          
                // save user token
                response.token = token;
                console.log(token)
          
                // user
                await res.status( response.statusCode ).json({ token: response.token}  );
                // res.status(200).json(response);
              } else{
                await res.status( response.statusCode ).json( {message: "incorrect email/password or email not exists"} );
              }

            // await res.status( response.statusCode ).json( response );
        }catch ( e ) {
            next( e );
        }
    }
    async getEmployee( req, res, next ) {
        try {
            console.log(req.body)
            const response = await this.service.getall( { role : "employee" } );

            

            console.log( response );

            await res.status( response.statusCode ).json( response );
        }catch ( e ) {
            next( e );
        }
    }

    async create( req, res, next ) {
        try {
            console.log(req.body)
            const user = req.body
            const response = await this.service.createUser( req.body );
            console.log(response)
            const token = jwt.sign(
                { user_id: response.data.id, email: response.data.email },
                secretKey
              );
              // save user token
              response.token = token;
            // console.log( response );
            await res.status( response.statusCode ).json( { token: response.token}  );
            // jwt.sign({ user }, secretKey, {expiresIn : "300s"}, (err, token) => {
            //     console.log(token, user.email, user.role)
                // res.json({token})
            // })
           
            
            
        } catch ( e ) {
            next( e );
        }
    }

    async delete( req, res, next ) {

        try {
            // req.param.id
            // console.log(req.query);
            
            const response = await this.service.Delete( req.query.id );
            

            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

    async update( req, res, next ) {

        try {

            // console.log(req.query.id);

            const response = await this.service.Update( req.query.id, req.body );

            return res.status( response.statusCode ).json( response );
        }catch ( e ) {
            next( e );
        }
    }

    async getbyid( req, res, next ) {
        try {
            // console.log( 'enter' );

            const response = await this.service.getById( req.params.id );
            
            console.log( response );

            delete response.data.password
            await res.status( response.statusCode ).json( response );
        }catch ( e ) {
            next( e );
        }
    }
}

module.exports = new UserController( userService );
