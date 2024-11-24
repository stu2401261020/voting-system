/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class ChoiceTableModel {
	public ChoiceTableModel( Choice__c choice ) {
		this.choiceId = choice.Id;
		this.choiceName = choice.Name;
		this.shortDescription = choice.ShortDescription__c;
		this.choiceUrl = '/choice-overview/' + choice.Id;
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