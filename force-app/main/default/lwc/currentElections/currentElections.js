/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { LightningElement, wire } from 'lwc';
import getCurrentElections from '@salesforce/apex/CurrentElectionsController.getCurrentElections';

export default class CurrentElections extends LightningElement {
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
		},
		{
			label: 'Vote',
			type: 'button',
			initialWidth: 135,
			typeAttributes: {
				label: 'Vote',
				name: 'voteAction',
				title: 'Click to Vote'
			}
		}
	];
	data;

	@wire(getCurrentElections)
	currentElections({data, error}) {
		if (data) {
			console.log('data', data);
			this.data = data;
		}
		if (error) {
			console.log('error', error);
		}
	}

	handleRowAction(event) {
		const action = event.detail.action;
		const row = event.detail.row;
		console.log('action.name', action.name);
		//console.log('row.electionId', row.electionId)

		/*		switch (action.name) {
					case 'voteAction':
						alert('Vote on: ' + JSON.stringify(row));
						break;
					case 'delete':
						const rows = this.data;
						const rowIndex = rows.indexOf(row);
						rows.splice(rowIndex, 1);
						this.data = rows;
						break;
				}*/
	}
}