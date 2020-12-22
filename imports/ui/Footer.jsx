import React, {Component} from 'react';
import {T, M} from '/imports/api/dict';
/**
 * App footer
 */
export default class Footer extends Component {

    render() {
        return (
            <div>
                <div className="text-center footer-font">
                    <div type="button" className="" data-toggle="modal" data-target="#myModal">site support :: btc ::
                        1F8oQGBM5WHDrFk4EHMjjb549rMcrKvSwy
                    </div>
                    <div>blockchain is cool but only Jesus can save</div>
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">BTC : 1F8oQGBM5WHDrFk4EHMjjb549rMcrKvSwy</h4>
                            </div>
                            <div className="modal-body">
                                <div className="text-center">
                                    <img className="text-center"
                                         src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=19PhzmeRzWUup8eddRefkcyKX7i6WU1dxM"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">{T(M.CLOSE)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}