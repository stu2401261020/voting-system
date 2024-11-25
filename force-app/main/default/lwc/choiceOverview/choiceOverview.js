/**
 * Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

import { api, LightningElement, wire } from 'lwc';
import getChoiceDetails from '@salesforce/apex/ChoiceOverviewController.getChoiceDetails';

export default class ChoiceOverview extends LightningElement {
	@api choiceId = 'a03QI00000Kf0jiYAB';
	choice;

	@wire(getChoiceDetails, { choiceId: '$choiceId' })
	getChoiceDetails({data, error}) {
		if (data) {
			console.log('choice', data);
			this.choice = data;
		}
		if (error) {
			console.log('error', error);
		}
	}
}