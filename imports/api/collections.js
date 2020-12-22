import {Mongo} from 'meteor/mongo'
import Logger from '/imports/lib/logger';

const log = new Logger('collections.js');

let Latest = undefined;
let Minutes = undefined;
let Previous = undefined; 

function initCollections() {
    Latest = new Mongo.Collection('latest');
    Previous = new Mongo.Collection('previous');
    Minutes = new Mongo.Collection('minutes');

    log.info('collections initialized');
}

export {initCollections, Latest, Minutes, Previous};
