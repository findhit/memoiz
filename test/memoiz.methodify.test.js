var Memoiz = require( '../' ),
    sinon = require( 'sinon' ),
    chai = require( 'chai' ),
    expect = chai.expect;

describe( "Memoiz", function () {
    var memoiz, math;

    beforeEach(function () {
        memoiz = new Memoiz();
        math = Object.create( Math );
    });

    describe( ".methodify", function () {

        it( "simple test", function () {

            math.min = Memoiz.methodify( math.min, memoiz );

            // Do a first run
            // and check if returned value is present on memoiz
            // on this case, should be -8
            var value = math.min( 0, 150, 30, 20, -8 );

            expect( value ).to.be.equal( memoiz.get( 'min' ) );

        });

        describe( ".bulk", function () {

            it( "test with our protected math object", function () {

                // methodify memoiz / memoizify object
                Memoiz.methodify.bulk( math, [ 'min', 'max' ], memoiz );

                // Do a first run
                var valueMin = math.min( 0, 150, 30, 20, -8 ), // -8
                    valueMax = math.max( 0, 150, 30, 20, -8 ); // 150

                expect( valueMin ).to.be.equal( memoiz.get( 'min' ) );
                expect( valueMax ).to.be.equal( memoiz.get( 'max' ) );

            });

        });

    });

});
