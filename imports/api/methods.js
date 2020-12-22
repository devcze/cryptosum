import {Meteor} from 'meteor/meteor';
import Logger from '/imports/lib/logger';

const log = new Logger('methods.js');

function initMethods() {
    Meteor.methods({
    });

    log.info('methods initialized');
}

export {initMethods};