import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import {store} from '/imports/redux/redux';
import CoinRow from '/imports/ui/CoinRow';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import CoinNavigator from '/imports/ui/CoinNavigation'
import coins from '/imports/api/coins';
import Log from '/imports/lib/logger';
import CoinList from '/imports/ui/CoinList';

var log = new Log('Coinpage.jsx');

/**
 * CoinPage content visual component
 */
export default class CoinPage extends Component {

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
        if (this.props.page === "vtc_percent") this.i = 5;
    }

    render() {

        var type = ["price_usd", "24h_volume_usd", "market_cap_usd", "percent_change_24h", "market_cap_percent","vtc_percent"];
        var label = ["Coin price ", "24h volume ", "Market cap ", "24h change %", "Market cap %","Volume/Cap %"];
        var decimals = [8, 0, 0, 4, 4, 8];
        var data = type[this.i];
        let currency = "";
        if (data === "price_usd" || data === "24h_volume_usd" || data === "market_cap_usd") {
            currency = this.props.store.getState().currency;
        }

        return (
            <div>
                <div className="col-lg-offset-1 col-md-offset-1 vertical-padding">
                    <CoinNavigator label={label[this.i]}
                                   currency={currency}
                                   onClickLeft={this.onClickLeft.bind(this)}
                                   onClickRight={this.onClick.bind(this)}/>
                </div>

                <div onClick={this.onClick.bind(this)}>
                    <CoinList data={data} decimals={decimals[this.i]}/>
                </div>
            </div>
        );
    }

    onClick() {
        this.i++;
        if (this.i > 5) this.i = 0;
        this.forceUpdate();
    }

    onClickLeft() {
        this.i--;
        if (this.i < 0) this.i = 5;
        this.forceUpdate();
    }
}

export default createContainer(() => {
    return {
        store: store
    }
}, CoinPage);