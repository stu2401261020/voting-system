/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getPastElections from '@salesforce/apex/PastElectionsController.getPastElections';

export default class PastElections extends NavigationMixin(LightningElement) {
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
			label: 'Check my vote',
			type: 'button',
			initialWidth: 135,
			typeAttributes: {
				label: 'Check',
				name: 'checkAction',
				title: 'Click to check who you voted for.'
			}
		}
	];
	data;

	@wire(getPastElections)
	pastElections({data, error}) {
		if (data) {
			this.data = data;
		}
		if (error) {
			console.log('error', error);
			this.refs.toastMessage.showToast('error', error.body.message, 5000);
		}
	}

	handleRowAction(event) {
		this[NavigationMixin.Navigate]({
										   type: 'comm__namedPage',
										   attributes: {
											   name: 'Check_Vote__c'
										   },
										   state: {
											   electionId: event.detail.row.electionId
										   }
									   });
	}
}