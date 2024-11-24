/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class ChoiceSelector implements IChoiceSelector {
	public List<Choice__c> getChoicesForElection( Id electionId ) {
		return [
				SELECT Name,
						ShortDescription__c,
						Type__c
				FROM Choice__c
				WHERE Election__c = :electionId
				ORDER BY Order__c ASC
		];
	}

	public Choice__c getChoiceDetails( Id choiceId ) {
		return [
				SELECT Name,
						ShortDescription__c,
						Description__c,
						PictureUrl__c,
						BackgroundImageUrl__c,
						Type__c
				FROM Choice__c
				WHERE Id = :choiceId
		];
	}
}