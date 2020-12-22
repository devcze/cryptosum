import {Meteor} from 'meteor/meteor';
import {initCollections, Latest, Minutes, Previous} from '/imports/api/collections';
import {initPublications} from '/imports/api/publications';
import Stopwatch from '/imports/lib/stopwatch';
import Logger from '/imports/lib/logger';
import {getDayHourMin} from '/imports/lib/dateutil';

var log = new Logger('main.js');

const stopwatch = new Stopwatch();

stopwatch.start();
Meteor.startup(() => {
    initCollections();
    initPublications();

    Meteor.setInterval(readMarketCup, 30000);
 //   Meteor.setInterval(readExchangeRates, 1000);


    stopwatch.stop();
    log.info('server initialized in ' + stopwatch.getTimeWithMs());
});

const F = {
    USD_VOLUME_24H : '24h_volume_usd',
    PRICE_USD: 'price_usd',
    MARKET_CAP_USD : 'market_cap_usd',
    PERCENT_CHANGE_24H : 'percent_change_24h',
    MARKET_CAP_PERCENT: 'market_cap_percent',
}

function readMarketCup() {

    // save previous data
    var data = Latest.find({}).fetch();
    data.map((dat) => {
        Previous.update({_id: dat._id}, dat, {upsert:true});
    });

    // save last data as previous
    var globalDataURL = 'https://api.coinmarketcap.com/v1/global/';
    var tickerURL = "https://api.coinmarketcap.com/v1/ticker/";

    var json = HTTP.call('GET', globalDataURL);
    var jsonTicker = HTTP.call('GET', tickerURL);

    var sum = {
         price_usd: 'N/A',
        "24h_volume_usd": json.data.total_24h_volume_usd,
        market_cap_usd: json.data.total_market_cap_usd,
        percent_change_24h: 'N/A',
        market_cap_percent: "100"
    }

    var coins = jsonTicker.data;
    var now = new Date();
    var date = getDayHourMin(now);

    coins.map((coin) => {
        coin.market_cap_percent = ((coin.market_cap_usd / sum.market_cap_usd) * 100).toFixed(2);

        if (coin.symbol === "$$$") coin.symbol = "MMM";

        Latest.update({_id: coin.symbol}, coin, {upsert: true});

        // dynamic query
        var q = {};
        q['$set'] = {};
        q['$set'][coin.symbol] = coin;

        Minutes.update({_id:date}, q, {upsert:true});
    });


    var btc = coins.filter((coin) => {
        if (coin.symbol === "BTC") {
            log.debug(coin);
            return coin;
        }
    })[0];


    var rest = {
        price_usd: 'N/A',
        "24h_volume_usd": sum['24h_volume_usd'] - btc["24h_volume_usd"],
        market_cap_usd: sum.market_cap_usd - btc.market_cap_usd,
        percent_change_24h: 'N/A',
        market_cap_percent: (sum.market_cap_percent - btc.market_cap_percent).toFixed(2)
    }

    log.debug('REST:' + rest);

    Latest.update({_id: 'sum'}, sum, {upsert: true});
    Latest.update({_id: 'rest'}, rest, {upsert: true});

    // dynamic query
    var q = {};
    q['$set'] = {};
    q['$set']['sum'] = sum;

    Minutes.update({_id:date}, q, {upsert:true});


    // dynamic query
    var q = {};
    q['$set'] = {};
    q['$set']['rest'] = rest;
    Minutes.update({_id:date}, q, {upsert:true});



    Latest.update({_id: 'lastUpdate'}, {lastUpdate: now}, {upsert: true});
    log.trace('Data updated');

}

function getData(json, sum) {

    return {
        price_usd: json.data[0].price_usd,
        "24h_volume_usd": json.data[0]['24h_volume_usd'],
        market_cap_usd: json.data[0].market_cap_usd,
        percent_change_24h: json.data[0].percent_change_24h,
        market_cap_percent: ((json.data[0].market_cap_usd / sum) * 100).toFixed(2)
    }
}

