/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public interface IVotingApiService {
	void createVoteRegistration( VoteRegistrationModel voteRegistration );
	void createVotes( List<VoteModel> votes );
	List<String> getVotes( String voteRegistrationId );
}