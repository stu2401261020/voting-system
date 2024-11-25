/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { api, LightningElement, wire } from 'lwc';
import getElectionOverviewData from '@salesforce/apex/ElectionOverviewController.getElectionOverviewData';
import getChoices from '@salesforce/apex/ElectionOverviewController.getChoices';

export default class ElectionOverview extends LightningElement {
	@api electionId = 'a01QI00000PiftwYAB';
	election;
	choices;

	@wire(getElectionOverviewData, { electionId: '$electionId' })
	getElectionOverviewData({data, error}) {
		if (data) {
			console.log('election', data);
			this.election = data;
		}
		if (error) {
			console.log('error', error);
		}
	}

	@wire(getChoices, { electionId: '$electionId' })
	getChoices({data, error}) {
		if (data) {
			console.log('election', data);
			this.choices = data;
		}
		if (error) {
			console.log('error', error);
		}
	}
}