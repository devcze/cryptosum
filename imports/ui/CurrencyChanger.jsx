import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import {store} from '/imports/redux/redux';
import A from '/imports/redux/actions';

/**
 * Currency changer visual component
 */
export default class CurrencyChanger extends Component {

    render() {
        return (
            <span onClick={this.onChangeCurrency.bind(this)}>
                {this.props.currency}
            </span>
        );
    }

    onChangeCurrency() {
        this.props.store.dispatch(A.switchCurrency());
    }
}

export default createContainer(() => {
    return {
        store: store
    }
}, CurrencyChanger);