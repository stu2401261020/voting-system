/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class ChoiceTableModel {
	public static List<ChoiceTableModel> parseChoices( List<Choice__c> inputChoices ) {
		List<ChoiceTableModel> choices = new List<ChoiceTableModel>();
		for( Choice__c choice : inputChoices) {
			choices.add( new ChoiceTableModel(choice));
		}
		return choices;
	}

	private ChoiceTableModel( Choice__c choice ) {
		this.choiceId = choice.Id;
		this.choiceName = choice.Name;
		this.shortDescription = choice.ShortDescription__c;
		this.choiceUrl = '/voting/choice-overview?choiceId=' + choice.Id;
	}

	@AuraEnabled
	public Id choiceId { get; private set; }
	@AuraEnabled
	public String choiceName { get; private set; }
	@AuraEnabled
	public String shortDescription { get; private set; }
	@AuraEnabled
	public String choiceUrl { get; private set; }

}