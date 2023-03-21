'use strict';
const autoBind = require( 'auto-bind' );
const { Service } = require( '../../system/services/Service' );
const bcrypt = require( 'bcrypt' );

class UserService extends Service {
    constructor( model ) {
        super( model );
        this.model = model;
        autoBind( this );
    }


    async createUser( data ) {
        try {
            const saltRounds = 10;
            const hashedPwd = await bcrypt.hash( data.password, saltRounds );

            data.password = hashedPwd;
            return await this.insert( data );
        } catch ( error ) {
            throw error;
        }
    }

    async getall( params ) {
        try {
            const user = await this.getAll( params );

            console.log( user );

            return user;
        } catch ( error ) {
            throw error;
        }
    }
    async Delete( id ) {
        try{
            return await this.delete( id );
        }catch( error ) {
            throw error;
        }
    }

    async Update( id, data ) {
        try{
            return await this.update( id, data );
        }catch( error ) {
            throw error;
        }
    }
    
    async getById( id ) {
        try{
            
            return await this.get( id );

        }catch( error ) {
            throw error;
        }
    }
}

module.exports = { UserService };
