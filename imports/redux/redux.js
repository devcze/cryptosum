import {applyMiddleware, createStore} from 'redux';
import app from './reducers';
import Logger from '/imports/lib/logger';
import createLogger from 'redux-logger';

var log = new Logger('redux.js');

var store = undefined;
var initRedux = function () {
    if (store !== undefined) {
        log.error('store is already initialized, skipping');
        return;
    }

    if (Meteor.isProduction) {
        store = createStore(app);
    } else {
        const logger = createLogger();
        store = createStore(app, applyMiddleware(logger));
    }


    log.info('store created, redux initalized');
}

export {store, initRedux};


/* singleton version (backup) */
/*
var storeSingleton = (function () {
    var instance;

    function init() {
        return createStore(app);

        // const logger = createLogger();
        //localStore = createStore(app, applyMiddleware(logger));
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
        var store = undefined;
    var initRedux = function () {
        if (store !== undefined) {
            log.error('store is already initialized, skipping');
            return;
        }
    }
    )();
*/