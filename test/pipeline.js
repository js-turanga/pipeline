/*
 * Test collection.all()
 *
 */

let expect = require( "chai" ).expect;
let Pipeline = require( "../src" );


/** Test Specification */

describe( "pipeline -", function() {

    it( 'should create pipeline instance without parameters', function() {
        
        const pipeline = new Pipeline;

        expect( pipeline.constructor.name ).to.eql('Pipeline');
        expect( pipeline ).to.eql(new Pipeline);
        expect( pipeline.countStages() ).to.eql(0);
    });


    it( 'should create pipeline instance with function parameter', function() {

        const sum = (arg) => { return arg + 2 }        

        const pipeline = new Pipeline(sum);
        expect( pipeline.getStages() ).to.eql([sum]);
        expect( pipeline.countStages() ).to.eql(1);
    });


    it( 'should create pipeline instance with array parameters', function() {

        const sum = (arg) => { return arg + 2 }        
        const multi = (arg) => { return arg * 2 }

        const pipeline = new Pipeline([sum, multi]);
        expect( pipeline.getStages() ).to.eql([sum, multi]);
        expect( pipeline.countStages() ).to.eql(2);
    });


    it( 'should append single stage to instance', function() {

        const sum = (arg) => { return arg + 2 }        

        const pipeline = new Pipeline();

        pipeline.pipe(sum);
        expect( pipeline.getStages() ).to.eql([sum]);
        expect( pipeline.countStages() ).to.eql(1);

    });


    it( 'should append multi stages to instance', function() {

        const sum = (arg) => { return arg + 2 }        
        const multi = (arg) => { return arg * 2 }

        const pipeline = new Pipeline();

        pipeline.pipe([sum, multi]);
        expect( pipeline.getStages() ).to.eql([sum, multi]);
        expect( pipeline.countStages() ).to.eql(2);

    });


    it( 'should append stages fluently to instance', function() {

        const sum = (arg) => { return arg + 2 }        
        const multi = (arg) => { return arg * 2 }

        const pipeline = new Pipeline();

        pipeline.pipe(sum).pipe(multi);
        expect( pipeline.getStages() ).to.eql([sum, multi]);
        expect( pipeline.countStages() ).to.eql(2);

    });


    it( 'should count stages', function() {

        const sum = (arg) => { return arg + 2 }        
        const multi = (arg) => { return arg * 2 }

        const pipeline = new Pipeline();

        pipeline.pipe([sum, multi]);
        expect( pipeline.countStages() ).to.eql(2);

    });


    it( 'should return stages', function() {

        const sum = (arg) => { return arg + 2 }        
        const multi = (arg) => { return arg * 2 }

        const pipeline = new Pipeline();

        pipeline.pipe([sum, multi]);
        expect( pipeline.getStages() ).to.eql([sum, multi]);

    });


    it( 'should process pipeline', function() {

        const sum = (arg) => { return arg + 2 }        
        const multi = (arg) => { return arg * 2 }

        const pipeline = new Pipeline();

        const result = pipeline.pipe(sum).pipe(multi).process(10);
        expect( result ).to.eql(24);

    });


    it( 'should process pipeline with literal value stage', function() {

        const sum = (arg) => { return arg + 2 }        
        const multi = (arg) => { return arg * 2 }

        const pipeline = new Pipeline();

        pipeline.pipe([sum, multi, 50]);

        const result = pipeline.process(10);
        expect( result ).to.eql(50);

    });
});
