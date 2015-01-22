var Memoiz = require( '../' ),
    sinon = require( 'sinon' ),
    chai = require( 'chai' ),
    expect = chai.expect;

describe( "Memoiz", function () {
    var memoiz;

    beforeEach(function () {
        memoiz = new Memoiz();
    });

    describe( "get / set", function () {

        it( "get should return undefined when a value isn't set", function () {
            var test = memoiz.get( 'test' );

            expect( test ).to.be.equal( undefined );
        });

        it( "should set true and get true", function () {
            memoiz.set( 'test', true );
            var test = memoiz.get( 'test' );

            expect( test ).to.be.equal( true );
        });

        it( "should delete cache if undefined is set", function () {
            memoiz.set( 'test', 'hello' );
            var test = memoiz.get( 'test' );

            expect( test ).to.be.equal( 'hello' );

            memoiz.set( 'test', undefined );
            var test = memoiz.get( 'test' );

            expect( test ).to.be.equal( undefined );
        })

    });

    describe( "clear", function () {

        it( "should delete keys and return undefined", function () {
            memoiz.set( 'test', 'hello' );
            var test = memoiz.get( 'test' );

            expect( test ).to.be.equal( 'hello' );

            memoiz.clear();
            var test = memoiz.get( 'test' );

            expect( test ).to.be.equal( undefined );
        });

    });

});
