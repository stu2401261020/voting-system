/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { LightningElement, wire } from 'lwc';
import getUpcomingElections from '@salesforce/apex/UpcomingElectionsController.getUpcomingElections';


export default class UpcomingElections extends LightningElement {
	columns = [
		{
			label: 'Election',
			fieldName: 'electionUrl',
			type: 'url',
			typeAttributes: {
				label: { fieldName: 'electionName' },
				target: '_blank',
				tooltip: 'Click to see more details.'
			}
		},
		{
			label: 'Details',
			fieldName: 'shortDescription',
			type: 'text'
		}
	];
	data;

	@wire(getUpcomingElections)
	upcomingElections({data, error}) {
		if (data) {
			console.log('data', data);
			this.data = data;
		}
		if (error) {
			console.log('error', error);
		}
	}
}