/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { api, LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

import getElection from '@salesforce/apex/VotingWizardController.getElection';
import getChoices from '@salesforce/apex/VotingWizardController.getChoices';
import vote from '@salesforce/apex/VotingWizardController.vote';

import choiceOverviewModal from 'c/choiceOverviewModal';

export default class VotingWizard extends NavigationMixin(LightningElement) {
	@api electionId;
	columns = [
		{
			label: 'Choice',
			fieldName: 'choiceName',
			type: 'text'
		},
		{
			label: 'Description',
			fieldName: 'shortDescription',
			type: 'text'
		},
		{
			label: '',
			type: 'button',
			initialWidth: 135,
			typeAttributes: {
				label: 'View Details',
				name: 'choiceDetails',
				title: 'View Details'
			}
		}
	];

	election;
	choices;

	selectedChoice;
	password;

	get voteNowTitle() {
		return 'Vote now in ' + this.election?.Name;
	}

	get voteButtonLabel() {
		return this.selectedChoice ? 'Vote for ' + this.selectedChoice.choiceName : 'Vote';
	}

	get voteButtonDisabled() {
		return !this.selectedChoice || !this.password;
	}

	@wire(CurrentPageReference)
	getStateParameters(currentPageReference) {
		if (currentPageReference) {
			this.electionId = currentPageReference.state.electionId;
		}
	}

	@wire(getElection, { electionId: '$electionId' })
	getElection({ data, error }) {
		if (data) {
			this.election = data;
		}
		if (error) {
			console.log('error', error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);

			this.handleCancel();
		}
	}

	@wire(getChoices, { electionId: '$election.Id' })
	getChoices({ data, error }) {
		if (data) {
			this.choices = data;
		}
		if (error) {
			console.log('error', error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);
			this.handleCancel();
		}
	}

	handleRowAction(event) {
		choiceOverviewModal.open({
									 choiceId: event.detail.row.choiceId
								 });
	}

	handleRowSelection(event) {
		this.selectedChoice = event.detail.selectedRows[0];
	}

	handlePasswordChange(event) {
		if (event.target.value.length < 5) {
			this.password = null;
		} else {
			this.password = event.target.value;
		}
	}

	handleVoteButton() {
		vote({
				 electionId: this.election.Id,
				 choicesIds: [this.selectedChoice.choiceId],
				 voterPassword: this.password
			 }).then(() => {
			this.refs.toastMessage.showToast('success', 'Voting successful.', 5000);
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