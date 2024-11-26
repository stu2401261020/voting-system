/**
 * Created by vassil.petkov@next-consult.com on 2024/11/25.
 */

import { api, LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getVoteChoice from '@salesforce/apex/CheckVoteController.getVoteChoice';

export default class CheckVote extends NavigationMixin(LightningElement) {
	@api electionId;
	password;
	response;

	get buttonDisabled() {
		return !this.password;
	}

	@wire(CurrentPageReference)
	getStateParameters(currentPageReference) {
		if (currentPageReference) {
			this.electionId = currentPageReference.state.electionId;
		}
	}

	handlePasswordChange(event) {
		if (event.target.value.length < 5) {
			this.password = null;
		} else {
			this.password = event.target.value;
		}
	}

	handleButton() {
		getVoteChoice({
						  electionId: this.electionId,
						  voterPassword: this.password
					  }).then((result) => {
			this.response = result;
		}).catch((error) => {
			console.log(error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);
		});
	}
	handleCancel() {
		this[NavigationMixin.Navigate]({
										   type: 'comm__namedPage',
										   attributes: {
											   name: 'Home'
										   }
									   });
	}
}