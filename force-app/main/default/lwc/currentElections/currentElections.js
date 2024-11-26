/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCurrentElections
	from '@salesforce/apex/CurrentElectionsController.getCurrentElections';

export default class CurrentElections extends NavigationMixin(LightningElement) {
	columns = [
		{
			label: 'Election',
			fieldName: 'electionUrl',
			type: 'url',
			typeAttributes: {
				label: { fieldName: 'electionName' },
				target: '_self',
				tooltip: 'Click to see more details.'
			}
		},
		{
			label: 'Details',
			fieldName: 'shortDescription',
			type: 'text'
		},
		{
			label: 'Vote',
			type: 'button',
			initialWidth: 135,
			typeAttributes: {
				label: 'Vote',
				name: 'voteAction',
				title: 'Click to vote',
				variant: 'brand'
			}
		},
		{
			label: 'Check Vote',
			type: 'button',
			initialWidth: 135,
			typeAttributes: {
				label: 'Check',
				name: 'checkAction',
				title: 'Click to check your vote'
			}
		}
	];
	data;

	@wire(getCurrentElections)
	currentElections({ data, error }) {
		if (data) {
			this.data = data;
		}
		if (error) {
			console.log('error', error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);
		}
	}

	handleRowAction(event) {
		switch (event.detail.action.name) {
			case 'voteAction':
				this.navigateToPage('Voting_Wizard__c', event.detail.row.electionId);
				break;
			case 'checkAction':
				this.navigateToPage('Check_Vote__c', event.detail.row.electionId);
				break;
		}
	}

	navigateToPage(pageName, electionId) {
		this[NavigationMixin.Navigate]({
										   type: 'comm__namedPage',
										   attributes: {
											   name: pageName
										   },
										   state: {
											   electionId: electionId
										   }
									   });
	}
}