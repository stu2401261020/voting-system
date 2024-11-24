/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public without sharing class ElectionSelector implements IElectionSelector {
	public static IElectionSelector getInstance() {
		return new ElectionSelector();
	}

	public List<Election__c> getCurrentElections( Set<Id> locationIds ) {
		return [
				SELECT Name,
						ShortDescription__c
				FROM Election__c
				WHERE Published__c = TRUE
				AND VotingStartDate__c <= TODAY
				AND VotingEndDate__c >= TODAY
				AND Location__c IN :locationIds
		];
	}

	public List<Election__c> getUpcomingElections( Set<Id> locationIds ) {
		return [
				SELECT Name,
						ShortDescription__c
				FROM Election__c
				WHERE Published__c = TRUE
				AND VotingEndDate__c < TODAY
				AND Location__c IN :locationIds
		];
	}

	public List<Election__c> getPastElections( Set<Id> locationIds ) {
		return [
				SELECT Name,
						ShortDescription__c
				FROM Election__c
				WHERE Published__c = TRUE
				AND VotingEndDate__c < TODAY
				AND Location__c IN :locationIds
		];
	}

	public Election__c getElectionDetails( Id electionId ) {
		return [
				SELECT
						Name,
						Description__c,
						BackgroundImageUrl__c
				FROM Election__c
		];
	}
}