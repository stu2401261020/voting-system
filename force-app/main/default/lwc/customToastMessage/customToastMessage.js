/**
 * Created by liliateodosheva on 20.06.24.
 */

import {LightningElement, api} from 'lwc';

export default class CustomToastMessage extends LightningElement {
    type='success';
    message;
    showToastBar = false;
    autoCloseTime = 5000;
    icon;

    @api
    showToast(type, message, time) {
        this.type = type;
        this.message = message;
        this.icon = 'utility:' + type;
        this.autoCloseTime = time;
        this.showToastBar = true;
        setTimeout(() => {
            this.closeModel();
        }, this.autoCloseTime);
    }

    closeModel() {
        this.showToastBar = false;
        this.type = '';
        this.message = '';
    }

    get iconClass(){
        return 'slds-icon slds-icon_small my-icon-' + this.type;
    }

    get innerClass() {
        return 'slds-icon_container slds-icon-utility-' + this.type + ' slds-m-right_small slds-no-flex slds-align-top';
    }

    get outerClass() {
        return 'slds-notify_toast toast-' + this.type;
    }

}