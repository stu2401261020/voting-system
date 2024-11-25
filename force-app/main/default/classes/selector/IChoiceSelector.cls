/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public interface IChoiceSelector {
	List<Choice__c> getChoicesForElection( Id electionId );
	Choice__c getChoiceDetails( Id choiceId );
	List<Choice__c> getChoicesByIds(List<Id> choicesIds);
}