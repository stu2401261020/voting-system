/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class ElectionOverviewController {
	@AuraEnabled(Cacheable=true)
	public static Election__c getElectionOverviewData( Id electionId ) {
		return ElectionSelector.getInstance().getElectionDetails( electionId );
	}

	@AuraEnabled(Cacheable=true)
	public static List<ChoiceTableModel> getChoices( Id electionId ) {
		List<ChoiceTableModel> choices = new List<ChoiceTableModel>();
		for( Choice__c choice : ChoiceSelector.getInstance().getChoicesForElection( electionId ) ) {
			choices.add( new ChoiceTableModel( choice ) );
		}
		return choices;
	}
}