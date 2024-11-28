/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class ElectionVoterSelector implements IElectionVoterSelector {
	public static IElectionVoterSelector getInstance() {
		return new ElectionVoterSelector();
	}

	public List<ElectionVoter__c> getElectionVoterRecord( Id electionId, Id voterId ) {
		return [
				SELECT Id
				FROM ElectionVoter__c
				WHERE Election__c = :electionId
				AND Voter__c = :voterId
		];
	}
}