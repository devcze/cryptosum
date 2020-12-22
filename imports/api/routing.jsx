import {mount} from 'react-mounter';
import MainLayout from '/imports/ui/App';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import React from 'react';
import CoinPage from '/imports/ui/CoinPage';
import Logger from '/imports/lib/logger';

const log = new Logger('routing.js');

function blockRouter() {
    FlowRouter.wait();
}

function initRouter() {
    FlowRouter.route('/', {
        name: 'items.list',
        action: function (params) {
            log.trace("routing to /");
            mount(MainLayout, {content:() => (<CoinPage page="cap"/>)});
        }
    });

    var known = ['cap','price','volume','change','cap_percent','vtc_percent'];

    for (let i = 0; i < known.length; i++) {
        FlowRouter.route('/' + known[i], {
            name: known[i],
            action: function (params) {
                mount(MainLayout, {content: () => { console.log(i + "," + known[i]); return (<CoinPage page={known[i]} />)}});
            }
        });
    }
    FlowRouter.notFound = {
        // Subscriptions registered here don't have Fast Render support.
        subscriptions: function () {

        },
        action: function (params) {
            log.trace("params:" + params);

        }
    };


    log.info('router initialized');
}

export {blockRouter, initRouter};