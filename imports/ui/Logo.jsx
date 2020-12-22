import React, {Component} from 'react';
import {store} from '/imports/redux/redux';
import {createContainer} from 'meteor/react-meteor-data'

/**
 * Logo visual app
 */
export default class Logo extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <a href="/"><img className="img-responsive" src={"img/logo-md.png"}/></a>
        );
    }
}

export default createContainer(() => {
    return {
        store: store
    }
}, Logo);