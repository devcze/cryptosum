import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import Logo from './Logo';
import Footer from './Footer';

/**
 * Main component
 */
export default App = ({content}) => {

    const columnsLayout = "col-md-6 col-md-offset-4 col-sm-5 col-sm-offset-3 col-xs-10 col-xs-offset-1";

    return (
        <div className="container">
            <div className="no-selection">
                <div className="row">
                    <div className={columnsLayout}>
                        <Logo />
                    </div>
                    <div className="row">
                        <div className={columnsLayout}>
                            {content()}
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="row">
                    <div className={columnsLayout}>
                        <Footer />
                    </div>
                </div>
            </footer>
        </div>
    )
};