/* eslint-disable global-require */
// eslint-disable quote-props
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );


class Data {
    initSchema() {
        const schema = new Schema(
            {
                'taskName': {
                    'type': String,
                },
                'details': {
                    'type': String,
                },
                'user': {
                    'type': mongoose.Schema.ObjectId,
                    'ref': 'user',
                    // 'autopopulate': true,
                },
                
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
            mongoose.model( 'task', schema );
        } catch ( e ) {
            console.log( e );
        }
    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'task' );
    }
}

module.exports = { Data };
