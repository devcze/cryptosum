import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import CoinValue from '/imports/ui/CoinValue'
import {store} from '/imports/redux/redux';

/**
 * Single Coin row component
 */
export default class CoinRow extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
                this.forceUpdate();
            }
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        return (
            <div className="grow row no-gutter">
                <div className="col-md-3 col-xs-2">
                    <a target="_blank"
                       data-toggle="tooltip"
                       title={this.props.coin + " - " + "Go to chart"}
                       href={this.props.chart + "?from=cryptosum.com"}>
                        <img id={this.props.coin}
                             className="pull-right img-responsive"
                             src={"/img/" + this.props.img}/>
                    </a>
                </div>
                <div className="col-md-6 col-xs-9">
                        <CoinValue change={this.props.change} changeVisual={this.props.changeVisual} value={this.props.value} coin={this.props.coin} data={this.props.data} toFixed={this.props.toFixed}/>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    return {
        store: store
    }
}, CoinRow);