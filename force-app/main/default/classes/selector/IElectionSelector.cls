/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public interface IElectionSelector {
	List<Election__c> getCurrentElections( Set<Id> locationIds );
	List<Election__c> getUpcomingElections( Set<Id> locationIds );
	List<Election__c> getPastElections( Set<Id> locationIds );
	Election__c getElectionDetails( Id electionId );
}