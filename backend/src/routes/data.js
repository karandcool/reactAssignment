'use strict';
const auth = require( '../../middleware/auth' );
const DataController = require( '../controllers/DataController' );

const express = require( 'express' ),
    router = express.Router();

router.post( '/', auth, DataController.create );
router.get( '/', auth, DataController.getAll );
router.put( '/', DataController.update );
router.delete( '/', DataController.delete );
router.get( '/:id', DataController.getbyid );


module.exports = router;
