import React, {Component} from 'react';
import CurrencyChanger from './CurrencyChanger'
import {createContainer} from 'meteor/react-meteor-data'
import {store} from '/imports/redux/redux';
import A from '/imports/redux/actions';

/**
 * Coin navigator visual component (metric arrows)
 */
export default class CoinNavigation extends Component {

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

        let titleDecoration = "";
        if (this.props.store.getState().ordering === true) {
            titleDecoration = "active-ordering";
        }

        return (
            <div className="row text-center">
                <div className="col-xs-2">
                    <img src="/img/arrowleft.png"
                         onClick={this.props.onClickLeft}></img>

                </div>

                <div className={"col-md-6 col-xs-7 text-center"}>
                    <b>
                        <span className={titleDecoration} onClick={this.switchOrdering.bind(this)}>{this.props.label}</span>
                        {this.props.currency === "" ? "" : <CurrencyChanger currency={this.props.currency}/>}
                    </b>
                </div>

                <div className="col-xs-2">
                    <img src="/img/arrowright.png"
                         onClick={this.props.onClickRight}></img>
                </div>
            </div>
        );
    }

    switchOrdering() {
        this.props.store.dispatch(A.switchOrdering());
    }

}

export default createContainer(() => {
    return {
        store: store
    }
}, CoinNavigation);


