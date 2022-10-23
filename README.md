# Pipeline
hen using pipelines you can pass an object and perform any type of task and finally return the resulting value once all the “tasks” have been executed.


## Installation
npm install js-turanga/pipeline


## Usage
The Pipeline package provides a fluent interface for convinient one-liner usage. However, you're not limited to take advantage based on your needs. 

Creating a new and empty pipeline instance:

	const Pipeline = require( "./pipeline/dist" );

	const pipeline = new Pipeline;

Creating a new pipeline instance while providing tasks as constructor arguments

	const pipeline = new Pipeline([validate, normalize, transform]);


You may consider to apply tasks after the pipeline nstantiation

	const pipeline = new Pipeline;

	pipeline.pipe(validate).pipe(normalize).pipe(transform)


Finally, process the pipeline with its tasks by:

	const result = pipeline.process({name: foo, title: foobar})

