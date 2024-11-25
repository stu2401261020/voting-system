/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class VotingWizardController {
	private static final String TEST_VOTER = '001QI00000PiaSoYAJ';

	@AuraEnabled( Cacheable=true )
	public static Election__c getElection( Id electionId ) {
		Election__c election = ElectionSelector.getInstance().getElectionDetails( electionId );
		validateElection( election );

		return election;
	}

	@AuraEnabled( Cacheable=true )
	public static List<Choice__c> getChoices( Id electionId ) {
		return ChoiceSelector.getInstance().getChoicesForElection( electionId );
	}

	@AuraEnabled
	public static Boolean hasRegistered( Id electionId ) {
		Election__c election = ElectionSelector.getInstance().getElectionDetails( electionId );
		List<ElectionVoter__c> electionVoter = validateElection( election );
		if( electionVoter.size() == 0 ) {
			return false;
		}
		return true;

	}

	@AuraEnabled
	public static void registerToVote( Id electionId, String voterPassword ) {
		Election__c election = ElectionSelector.getInstance().getElectionDetails( electionId );
		List<ElectionVoter__c> electionVoter = validateElection( election );
		if( electionVoter.size() > 0 ) {
			throw new VotingException();
		}

		electionVoter.add( new ElectionVoter__c( Election__c = election.Id, Voter__c = getVoterId() ) );

		VotingApiService.getInstance().createVoteRegistration( new VoteRegistrationModel(
				hashVoterPassword( electionId, voterPassword )
		) );
		insert electionVoter;
	}

	@AuraEnabled
	public static void vote( Id electionId, List<Id> choicesIds, String voterPassword ) {
		Election__c election = ElectionSelector.getInstance().getElectionDetails( electionId );
		List<ElectionVoter__c> electionVoter = validateElection( election );
		List<Choice__c> choices = ChoiceSelector.getInstance().getChoicesByIds( choicesIds );
		validateChoices( choices, electionId );

		if( electionVoter.isEmpty() || electionVoter[ 0 ].HasVoted__c ) {
			throw new VotingException();
		}

		List<VoteModel> votes = new List<VoteModel>();
		for( Id choiceId : choicesIds ) {
			votes.add( new VoteModel( hashVoterPassword( electionId, voterPassword ), choiceId ) );
		}
		VotingApiService.getInstance().createVotes( votes );
		electionVoter[ 0 ].HasVoted__c = true;
	}

	private static List<ElectionVoter__c> validateElection( Election__c election ) {
		if( !election.Published__c ||
				election.VotingStartDate__c > Datetime.now() ||
				election.VotingEndDate__c < Datetime.now() ) {
			throw new VotingException( 'Voting is not available for this election.' );
		}
		List<ElectionVoter__c> electionVoter =
				ElectionVoterSelector.getInstance().getElectionVoterRecord( election.Id, getVoterId() );
		if( electionVoter.size() > 0 && electionVoter[ 0 ].HasVoted__c ) {
			throw new VotingException( 'You have already voted on this election.' );
		}
		return electionVoter;
	}

	private static void validateChoices( List<Choice__c> choices, Id electionId ) {
		for( Choice__c choice : choices ) {
			if( choice.Election__c != electionId ) {
				throw new VotingException();
			}
		}
	}

	private static String hashVoterPassword( Id electionId, String voterPassword ) {
		String personalNumber = AccountSelector.getInstance().getAccountById( getVoterId() ).PersonalIdentificationNumber__pc;
		return Md5Util.generateMd5Hash(electionId + personalNumber + voterPassword);
	}

	private static Id getVoterId() {
		return TEST_VOTER;
	}
}