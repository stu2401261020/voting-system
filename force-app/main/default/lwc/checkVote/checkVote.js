/**
 * Created by vassil.petkov@next-consult.com on 2024/11/25.
 */

import { api, LightningElement } from 'lwc';
import getVoteChoice from '@salesforce/apex/CheckVoteController.getVoteChoice';

export default class CheckVote extends LightningElement {
	@api electionId = 'a01QI00000PiftwYAB';
	password;
	response;

	get buttonDisabled() {
		return !this.password;
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
			console.log(result);
			this.response = result;
		}).catch((error) => {
			console.log(error);
		});
	}
}