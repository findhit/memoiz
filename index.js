var Util = require( 'findhit-util' ),

    debug = require( 'debug' )( 'findhit:memoiz' );

// -----------------------------------------------------------------------------

var Memoiz = module.exports = function ( options ) {

    this.options = options;

};

/* Class methods */

Memoiz.method = function ( method, optionsOrMemoiz ) {

    var methodName = method.name || 'anonymous';

    debug( "memoizifying %s", methodName );

    var fn = function () {
        var cached = memoiz.get();

        if( cached ) {
            debug( "returning cached value for %s", methodName );
            return cached;
        }

        var cached = method.apply( this, arguments );

        debug( "setting cached value for %s", methodName );
        memoiz.set( cached );

        return cached;
    };

    var memoiz = fn.__proto__ =
            optionsOrMemoiz instanceof Memoiz && optionsOrMemoiz ||
            new Memoiz( options ),
        options =
            optionsOrMemoiz !== memoiz && Util.is.Object( optionsOrMemoiz ) && optionsOrMemoiz ||
            {};

    return fn;
};

Memoiz.bulk = function ( object, methods, optionsOrMemoiz ) {

    if( ! object ) {
        throw new TypeError( "We need a Constructor!1" );
    }

    methods = Util.is.Array( methods ) && methods ||
        Object.keys( object );

    Util.each( methods, function ( method ) {
        object[ method ] = Memoiz.method( object[ method ], optionsOrMemoiz );
    });

    return object;
};

/* instance methods */

Memoiz.prototype.get = function () {
    return this.cache;
};

Memoiz.prototype.set = function ( value ) {
    return this.cache = value;
};

Memoiz.prototype.clear = function () {
    delete this.cache;
    return true;
};
