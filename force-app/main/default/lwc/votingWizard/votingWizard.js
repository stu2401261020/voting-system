/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { api, LightningElement, wire } from 'lwc';

import getElection from '@salesforce/apex/VotingWizardController.getElection';
import getChoices from '@salesforce/apex/VotingWizardController.getChoices';
import vote from '@salesforce/apex/VotingWizardController.vote';

import choiceOverviewModal from 'c/choiceOverviewModal';

export default class VotingWizard extends LightningElement {
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
	choices;

	@api
	electionId = 'a01QI00000PiftwYAB';
	election;

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

	@wire(getElection, { electionId: '$electionId' })
	getElection({ data, error }) {
		if (data) {
			console.log('election', data);
			this.election = data;
		}
		if (error) {
			console.log('error', error);
		}
	}

	@wire(getChoices, { electionId: '$election.Id' })
	getChoices({ data, error }) {
		if (data) {
			console.log('choices', data);
			this.choices = data;
		}
		if (error) {
			console.log('error', error);
		}
	}

	handleRowAction(event) {
		choiceOverviewModal.open({
									 recordId: event.detail.row.choiceId
								 });
	}

	handleRowSelection(event) {
		console.log('handleRowSelection', event.detail.selectedRows);
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
			console.log('Voting successful.');
		}).catch((error) => {
			console.log(error);
		});
	}
}