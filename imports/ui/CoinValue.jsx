import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import {Latest, Previous} from '/imports/api/collections.js'
import {Meteor} from 'meteor/meteor';
import {store} from '/imports/redux/redux';
import Rotator from '/imports/api/rotator';

import Logger from '/imports/lib/logger';
const log = new Logger('CoinValue');

/**
 * Coin value visual component
 */
export default class CoinValue extends Component {

    constructor() {
        super();
        this.state = {
            valueChangedEffect: "",
        }
        this.observer = undefined;
        this.cursor = undefined;
        this.green = new Rotator(['up', 'up2']);
        this.red = new Rotator(['down', 'down2']);
        this.init = new Rotator(['init', 'init2']);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
                this.forceUpdate();
            }
        );

        this.cursor = Latest.find({_id: 'lastUpdate'});
        this.observer = this.cursor.observe({
            changed: this.changed.bind(this)
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        log.info('will umount');
        this.observer.stop();
    }

    render() {
        return (
            <div className={"pull-right"}>
                <span className={ this.state.valueChangedEffect}>
                    {this.props.value}
                </span>&nbsp;
                <span className={"margin-sides "}></span>
                &nbsp;
                <img className="data-tooltip" title={"24h change : " + this.props.change + "%"} src={"/img/" + this.props.changeVisual + ".png"}/>
            </div>
        )
            ;
    }
    
    /**
     * Callback for db change observer
     */
    changed(id, fields) {
        log.trace('changed:' + this.props.coin + ":" + this.props.data);

        var newVal = (this.getCoin())[this.props.data];
        log.debug('newVal:' + newVal + " for:" + this.props.coin + "," + this.props.data);

        var lastValue = (this.getPrev())[this.props.data];

        if (lastValue === 0) {
            this.lastValue[this.props.coin][this.props.data] = newVal;
            lastValue = newVal;
        }

        if (newVal > lastValue) {
            this.setState({valueChangedEffect: this.green.getVal()});
            log.debug('value incremented:' + lastValue + '->' + newVal + ":" + this.state.valueChangedEffect);
        } else if (newVal < lastValue) {
            this.setState({valueChangedEffect: this.red.getVal()});
            log.debug('value decremented:' + lastValue + '->' + newVal + ":" + this.state.valueChangedEffect);
        }
    }


    /**
     * Get latest coin data from database
     */
    getCoin() {
        var callback = ((coin) => {
            if (coin._id === this.props.coin) {
                return coin;
            }
        });

        var ret = this.props.cap.filter(callback.bind(this));
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

}

export default createContainer(() => {
    Meteor.subscribe('latest');
    Meteor.subscribe('previous');

    return {
        cap: Latest.find({}).fetch(),
        prev: Previous.find({}).fetch(),
        store: store
    }
}, CoinValue);

