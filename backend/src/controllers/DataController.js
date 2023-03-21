/* eslint-disable */
const autoBind = require( 'auto-bind' );
const fs = require('fs')
const { DataService } = require( '../services/DataService' );
const { Data } = require( './../models/newData' );

const dataService = new DataService(
    new Data().getInstance()
);

class DataController {
    constructor( service ) {
        this.service = service;
        autoBind( this );
    }

    async getAll( req, res, next ) {
        try {

            console.log( req.user.user_id)
            const response = await this.service.getall( {user: req.user.user_id});

            await res.status( response.statusCode ).json( response );
        }catch ( e ) {
            next( e );
        }
    }
    

    async create( req, res, next ) {
        try {
            console.log(req.body, req.user)
            req.body.user =  req.user.user_id
            console.log(req.body)
            const response = await this.service.create( req.body );
           
            await res.status( response.statusCode ).json( response  );
           
            
            
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

module.exports = new DataController( dataService );
