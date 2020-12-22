import {Latest, Previous} from '/imports/api/collections';
import {Meteor} from 'meteor/meteor';
import Logger from '/imports/lib/logger';

const log = new Logger('publications.js');

function initPublications() {
    Meteor.publish('latest', function itemsPublications() {
        return Latest.find({_id: {$in: ['sum','rest','BTC','LTC','XRP','ETH','XEM','DASH','MAID','LSK','DOGE','STEEM','NXT','EMC','ETC','AMP','lastUpdate']}});
    });
    Meteor.publish('previous', function itemsPublications() {
        return Previous.find({_id: {$in: ['sum','rest','BTC','LTC','XRP','ETH','XEM','DASH','MAID','LSK','DOGE','STEEM','NXT','EMC','ETC','AMP','lastUpdate']}});
    });
    log.info('publications initialized');
}

export {initPublications};
