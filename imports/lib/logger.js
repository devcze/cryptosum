import {Meteor} from 'meteor/meteor';

/**
 * Simple logger
 */
export default class Logger {
    constructor(location) {
        this.location = location;
        this.isVip = false;
    }

    trace(msg) {
        this.message("|trace|", msg );
    }
    info(msg) {
        this.message("|info|", msg );
    }
    debug(msg) {
        this.message("|debug|", msg);
    }
    error(msg) {
        this.message("|error|", msg);
    }
    bold(type, msg) {
        this.message(type,msg);
        this.separator();
    }
    message(type,msg) {
        if (!Meteor.isProduction) {
            if (this.isVip === false)
                console.log(type, this.location, "\t|", msg);
            else if (type === "|vip|") {
                this.separator();
                console.log(type, this.location, "\t|", msg);
                this.separator();
            }
        }
    }
    separator() {
        if (!Meteor.isProduction) {
            console.log("--------------------------------------------------")
        }
    }

    vip(msg) {
        this.isVip = true;
        this.message("|vip|", msg);
    }
}
