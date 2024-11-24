/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class ChoiceOverviewController {
	@AuraEnabled(Cacheable=true)
	public static Choice__c getChoiceDetails( Id choiceId ) {
		return ChoiceSelector.getInstance().getChoiceDetails( choiceId );
	}
}