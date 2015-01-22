var Memoiz = require( './memoiz' ),
    Util = require( 'findhit-util' ),
    debug = require( 'debug' )( 'memoiz:methodify' );

// -----------------------------------------------------------------------------

/**
 * Memoiz.methodify - memoizifies a method, or vice-versa
 *
 * @param  {function}   method          method to run on each call
 * @param  {mixed}      optionsOrMemoiz options or a memoiz instance
 * @return {function}                   method that will call provided method
 *                                      when no cache is available on memoiz
 */
Memoiz.methodify = function ( method, optionsOrMemoiz ) {

    var methodName = method.name || 'anonymous-' + Util.uniqId();

    debug( "memoizifying %s", methodName );

    var fn = function () {
        var cached = memoiz.get( methodName );

        if( cached ) {
            debug( "returning cached value for %s", methodName );
            return cached;
        }

        var cached = method.apply( this, arguments );

        debug( "setting cached value for %s", methodName );
        memoiz.set( methodName, cached );

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



/**
 * Memoiz.methodify.bulk - methodify on bulk (object)
 *
 * @param  {object}    object          description
 * @param  {array}     methods         Array with methods names
 * @param  {object}    optionsOrMemoiz options or a memoiz instance
 * @return {object}                    returns object provided on `object` param
 */
Memoiz.methodify.bulk = function ( object, methods, optionsOrMemoiz ) {

    if( ! object ) {
        throw new TypeError( "We need an Object!!1" );
    }

    methods = Util.is.Array( methods ) && methods ||
        Object.keys( object );

    Util.each( methods, function ( method ) {
        object[ method ] = Memoiz.methodify( object[ method ], optionsOrMemoiz );
    });

    return object;
};
