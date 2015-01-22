var debug = require( 'debug' )( 'memoiz:proto' );

// -----------------------------------------------------------------------------
var proto = module.exports = {};


/**
 * Memoiz.prototype.get - get a key from cache
 *
 * @param  {string}  key          Key that you want to get (defaults to default)
 * @param  {mixed}   defaultValue description
 * @return {boolean}              description
 */
proto.get = function memoiz_get( key, defaultValue ) {
    var cache = this.cache || ( this.cache = {} );

    key = typeof key == 'string' && key || this.options.defaultKey;

    return typeof cache[ key ] != 'undefined' ? cache[ key ] : defaultValue;
};


/**
 * Memoiz.prototype.set - set or clear a key on cache
 *
 * @param  {string} key  Key that you want to set (defaults to default)
 * @param  {mixed}       value Value that you wan't to set (undefined clears key)
 * @return {boolean}     Boolean indicating that things were cleared
 */
proto.set = function memoiz_set( key, value ) {
    var cache = this.cache || ( this.cache = {} );

    value = arguments.length === 1 ? key :
        value || undefined;

    key = arguments.length === 1 ? this.options.defaultKey :
        typeof key == 'string' && key || this.options.defaultKey;

    if( value === undefined ) {
        delete cache[ key ];
        return true;
    }

    cache[ key ] = value;
    return true;
};


/**
 * Memoiz.prototype.clear - clear entire cache, or a specific key
 *
 * @param  {string}     key     Key that you want to clear
 * @return {boolean}            Boolean indicating that things were cleared
 */
proto.clear = function memoiz_clear ( key ) {
    if( key ) {
        return memoiz_set( key, undefined );
    }

    delete this.cache;
    return true;
};
