/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { api, LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getElectionOverviewData
	from '@salesforce/apex/ElectionOverviewController.getElectionOverviewData';
import getChoices from '@salesforce/apex/ElectionOverviewController.getChoices';

import choiceOverviewModal from 'c/choiceOverviewModal';

export default class ElectionOverview extends NavigationMixin(LightningElement) {
	@api electionId;
	election;
	choices;

	@wire(CurrentPageReference)
	getStateParameters(currentPageReference) {
		if (currentPageReference) {
			this.electionId = currentPageReference.state.electionId;
		}
	}

	@wire(getElectionOverviewData, { electionId: '$electionId' })
	getElectionOverviewData({ data, error }) {
		if (data) {
			this.election = data;
		}
		if (error) {
			console.log('error', error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);
		}
	}

	@wire(getChoices, { electionId: '$electionId' })
	getChoices({ data, error }) {
		if (data) {
			this.choices = data;
		}
		if (error) {
			console.log('error', error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);
		}
	}

	handleCancel() {
		this[NavigationMixin.Navigate]({
										   type: 'comm__namedPage',
										   attributes: {
											   name: 'Home'
										   }
									   });
	}

	showChoiceModal(event) {
		choiceOverviewModal.open({
									 choiceId: event.target.getAttribute('data-id')
								 });
	}
}