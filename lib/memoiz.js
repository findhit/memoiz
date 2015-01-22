var Util = require( 'findhit-util' ),

    debug = require( 'debug' )( 'memoiz' );

// -----------------------------------------------------------------------------

var Memoiz = module.exports = function ( options ) {

    options = this.options = options || {};
    options.__proto__ = Memoiz.defaultOptions;

};

Memoiz.defaultOptions = {
    prefix: '',
    defaultKey: 'default',
};

Memoiz.prototype = require( './memoiz.proto' );

/* Load methods */
require( './memoiz.methodify' );
