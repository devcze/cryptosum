import {store, initRedux} from '/imports/redux/redux';
import {initRouter} from '/imports/api/routing';
import {initCollections} from '/imports/api/collections';
import Stopwatch from '/imports/lib/stopwatch';
import Logger from '/imports/lib/logger';

var log = new Logger('main.js');

const stopwatch = new Stopwatch();
stopwatch.start();

initRouter();
Meteor.startup(() => {

    initCollections();
    initRedux();

    stopwatch.stop();
    log.info('client initialized in ' + stopwatch.getTimeWithMs());
});




