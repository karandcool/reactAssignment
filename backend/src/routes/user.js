'use strict';
const UserController = require( '../controllers/UserController' );
const auth = require( '../../middleware/auth' );
const express = require( 'express' ),
    router = express.Router();

router.post( '/', UserController.create );
router.post( '/detail', UserController.getDetail );
router.get( '/', UserController.getAll );
router.get( '/employee', auth, UserController.getEmployee );
router.put( '/', UserController.update );
router.delete( '/', UserController.delete );
router.get( '/:id', UserController.getbyid );

module.exports = router;
