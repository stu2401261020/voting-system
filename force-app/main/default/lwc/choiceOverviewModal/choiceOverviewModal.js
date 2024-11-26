/**
 * Created by vassil.petkov@next-consult.com on 2024/11/25.
 */

import LightningModal from 'lightning/modal';
import { api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import getChoiceDetails from '@salesforce/apex/ChoiceOverviewController.getChoiceDetails';

export default class ChoiceOverviewModal extends LightningModal {
	@api choiceId;
	choice;

	@wire(CurrentPageReference)
	getStateParameters(currentPageReference) {
		if (currentPageReference) {
			this.choiceId = currentPageReference.state.choiceId;
		}
	}

	@wire(getChoiceDetails, { choiceId: '$choiceId' })
	getChoiceDetails({ data, error }) {
		if (data) {
			this.choice = data;
		}
		if (error) {
			console.log('error', error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);
		}
	}
}