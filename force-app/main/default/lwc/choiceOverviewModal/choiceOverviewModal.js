/**
 * Created by vassil.petkov@next-consult.com on 2024/11/25.
 */

import LightningModal from 'lightning/modal';
import { api } from 'lwc';

export default class ChoiceOverviewModal extends LightningModal {
	@api recordId;
}