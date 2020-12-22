// Redux actions 

import T from './action-types.js';

/**
 * Redux actions
 */
class A {
    static switchCurrency(lang) {
        return {
            type: T.SWITCH_CURRENCY,
            lang
        }
    }
    static switchOrdering() {
        return {
            type: T.SWITCH_ORDERING
        }
    }
}

export default A;