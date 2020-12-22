import React, {Component} from 'react';
import {Latest, Previous} from '/imports/api/collections';
import {createContainer} from 'meteor/react-meteor-data'
import {store} from '/imports/redux/redux';
import CoinRow from '/imports/ui/CoinRow';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import coins from '/imports/api/coins';
import Log from '/imports/lib/logger';
import accounting from 'accounting';
var log = new Log('Coinpage.jsx');

/**
 * CoinPage content visual component
 */
export default class CoinList extends Component {

    constructor() {
        super();
        this.i = 0;
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
                this.forceUpdate();
            }
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentWillMount() {
        if (this.props.page === "price") this.i = 0;
        if (this.props.page === "cap") this.i = 2;
        if (this.props.page === "volume") this.i = 1;
        if (this.props.page === "change") this.i = 3;
        if (this.props.page === "cap_percent") this.i = 4;
    }

    render() {

        return (
                <div>
                    { this.renderCoins(this.props.data, this.props.decimals) }
                </div>
        );
    }

    renderCoins(data, toFixed) {

        var arr = Object.keys(coins);
        var sorted = arr.sort((function (a,b) {
            var order_matric = "market_cap_usd";
            if (this.props.store.getState().ordering === true) {
                order_matric = this.props.data;
            }

            var v1 = this.getValue(a,order_matric);
            var v2 = this.getValue(b,order_matric);

            if (v1 === "N/A") return -1;
            if (v2 === "N/A") return 1;

            return v2 - v1;
        }).bind(this));


        return sorted.map((function (key) {
            var coin = this.getCoin(key);

            var value = this.getDecoratedValue(this.getValue(key, this.props.data));
            var tens = "0";
            var change = "0";
            if (coin !== undefined) {
                var {tens, change} = this.getTensVisualIndicator(coin);
            }

            return (
                <CoinRow img={key.toLowerCase() + ".png"} coin={coins[key].coin} data={data} toFixed={toFixed}
                         chart={coins[key].chart} value={value} change={change} changeVisual={tens}/>
            )
        }
        ).bind(this));
    }

    /**
     * Get latest coin data from database
     */
    getCoin(coinId) {
        log.debug('getCoin coinId:' + coinId );
        var callback = ((coin) => {
            if (coin._id === coinId) {
                return coin;
            }
        });

        var ret = this.props.cap.filter(callback.bind(this));
        log.debug('getCoin returns:' + ret[0] );
        return ret[0];
    }


    /**
     * Get previous data from database
     */
    getPrev() {
        var callback = ((coin) => {
            if (coin._id === this.props.coin) {
                return coin;
            }
        });

        var ret = this.props.prev.filter(callback.bind(this));
        return ret[0];
    }

    /**
     * Gets final value that is presented
     * @returns {string}
     */
    getValue(coinId, metrics) {
        var obj = this.getCoin(coinId);
        let value = '';

        // volume:cap ratio index

        if (obj !== undefined) {
            if (metrics === "vtc_percent") {
//            var type = ["price_usd", "24h_volume_usd", "market_cap_usd", "percent_change_24h", "market_cap_percent"];
                var mc = obj["market_cap_usd"];
                var dv = obj["24h_volume_usd"];
                value = (dv / mc) * 100;
            } else {
                value = obj[metrics];
            }
    }

        if (value === undefined) return "N/A";

        return value;
    }

    getDecoratedValue(input) {
        let value = input;

        if ((value !== "N/A") && (this.props.data !== "percent_change_24h") && (this.props.data !== "market_cap_percent")) {
            const state = this.props.store.getState();

 //           var number = obj[this.props.data];
            var number = value;
            if (state.currency === "Ƀ") {
                var btcInUSD = this.getBTCPriceInUSD();
                number = number / btcInUSD;
            }

            value = accounting.formatNumber(number, this.props.decimals);
        } else if (value !== "N/A") {
            value = value + " %";
        }

        if (value === "N/A") value = "✖";

        log.debug("value:" + value);
        return value;
    }

    /**
     * Gets visual identifier for 24hour change
     * @param coin
     * @returns {{tens: string, change: *}}
     */
    getTensVisualIndicator(coin) {
        var tens = "0";
        var change = "0";
        if (coin !== undefined) {
            var change = coin["percent_change_24h"];
            if (change > 0) {
                tens = (Math.floor(change / 10) + 1) * 10;
                if (tens > 180) tens = 180;
            }

            else if (change < 0) {
                tens = (Math.floor(-change / 10) + 1) * 10;
                if (tens > 100) tens = 100;
                tens = "m" + tens;
            }
        }
        return {tens, change};
    }

    /**
     * Gets BTC price in USD
     * @returns {*}
     */
    getBTCPriceInUSD() {
        var callback = ((coin) => {
            if (coin._id === "BTC") {
                return coin;
            }
        });

        var latest = this.props.cap.filter(callback.bind(this));
        log.debug('lastest:' + latest);
        var btcPriceInUSD = latest[0]["price_usd"];

        log.debug('btc price in usd:' + btcPriceInUSD);
        return btcPriceInUSD;
    }
}

export default createContainer(() => {
    Meteor.subscribe('latest');
    Meteor.subscribe('previous');

    return {
        cap: Latest.find({}).fetch(),
        prev: Previous.find({}).fetch(),
        store: store
    }
}, CoinList);