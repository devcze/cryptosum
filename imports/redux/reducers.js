import {Meteor} from 'meteor/meteor';
import {findBootstrapEnvironment} from '/imports/lib/bootstrap';
import T from './action-types.js';

/**
 * Application reducer
 */
function app(state = {
    currency: "$",
    ordering: true,
    global: {lang: 'en', res: findBootstrapEnvironment}
}, action) {

    switch (action.type) {
        case T.SWITCH_CURRENCY:
            if (state.currency === "$") {
                state.currency = "Ƀ";
            } else {
                state.currency = "$";
            }
            break;

        case T.SWITCH_ORDERING:
            state.ordering = !state.ordering;
            break;
        default:
            break;


    }

    return state;
}

export default app;