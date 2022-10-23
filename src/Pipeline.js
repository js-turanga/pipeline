'use strict';

/*
 * This file is part of the Pipeline package.
 *
 * (c) Mark Fluehmann <js.turanga@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Pipeline {

    /**
     * Create a new class instance.
     *
     * @param {function|array}  stages  function or array of functions
     * @constructor
     */
    constructor(stages) {

        this.stages = [];

        if (typeof stages === 'function' || Array.isArray(stages))
            this.pipe(stages);
    }


    /**
     * Pipe adds a new stage. Stage can be a function, an array of functions or some literal value. 
     * A literal value will be passed to the next stage while ignoring the last stage
     *
     * @param {function|array|value}  stages  function, array of functions or literal value
     * @returns {this}
     */
    pipe(stages) {

        // avoid empty stages
        if (stages === null || stages === undefined)
            return this;

        // defauls to array
        stages = Array.isArray(stages) ? stages : [stages];

        // extend stages
        const that = this
        stages.forEach(function (stage, index) {
            that.stages.push(stage);
        });

        return this;
    }


    /**
     * Get pipeline stages
     *
     * @returns {array}
     */
    getStages() {
        return this.stages;
    }


    /**
     * Count pipeline stages
     *
     * @returns {array}
     */
    countStages() {
        return this.stages.length
    }


    /**
     * Processes the pipeline with passed arguments
     *
     * @param {object|value}  args
     * @returns {mixed}
     */
    process(args) {

        // Set default result as args
        let result = args;

        // Pipeline without stages returns args
        if (this.stages.length === 0) {
            return result;
        }

        this.stages.forEach(function (stage, index) {

            // resolve promise as result of previous stage
            if (result && typeof result.then === 'function') {

                // await next stage to be called 
                result = result.then(stage);
            } 

            // resolve next stage with result from previous stage
            else {
                result = typeof stage === 'function' ? stage(result) : stage
            }

        });

        return result;
    }

}

module.exports = Pipeline