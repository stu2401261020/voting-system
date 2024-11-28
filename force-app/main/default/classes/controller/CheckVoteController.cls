/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/25.
 */

public with sharing class CheckVoteController {
	private static Id voterId;

	@AuraEnabled
	public static String getVoteChoice( Id electionId, String voterPassword ) {
		return 'You voted for: ' + ChoiceSelector.getInstance().getChoiceDetails(
				VotingApiService.getInstance().getVotes( hashVoterPassword(electionId, voterPassword)
				)[0]).Name;
	}

	private static String hashVoterPassword( Id electionId, String voterPassword ) {
		String personalNumber = AccountSelector.getInstance().getAccountById( getVoterId() ).PersonalIdentificationNumber__pc;
		return Md5Util.generateMd5Hash(electionId + personalNumber + voterPassword);
	}

	private static Id getVoterId() {
		if( String.isBlank(voterId) ) {
			voterId = UserSelector.getInstance().getCurrentUserAccountId();
		}
		return voterId;
	}
}