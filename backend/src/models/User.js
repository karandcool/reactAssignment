/* eslint-disable global-require */
// eslint-disable quote-props
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );


class User {
    initSchema() {
        const schema = new Schema(
            {
                'name': {
                    'type': String,
                },
                'email': {
                    'type': String,
                    'unique': true
                },
                'password': {
                    'type': String
                },
                'gender': {
                    'type': String,
                },
                'phoneNo': {
                    'type': String,
                },

                // 'status': {
                //     'type': String,
                // },
                
                // 'date': {
                //     'type': Date
                // },

            },
            { 'timestamps': true }
        );

        schema.set( 'toJSON', {
            'virtuals': true,
            'versionKey': false,
            'transform': function( doc, ret ) {
                delete ret._id;
            },
        } );

        schema.plugin( require( 'mongoose-autopopulate' ) );

        try {
            mongoose.model( 'user', schema );
        } catch ( e ) {
            console.log( e );
        }
    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'user' );
    }
}

module.exports = { User };
