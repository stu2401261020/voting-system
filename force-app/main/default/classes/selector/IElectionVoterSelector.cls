/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public interface IElectionVoterSelector {
	List<ElectionVoter__c> getElectionVoterRecord( Id electionId, Id voterId );
}