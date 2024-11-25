/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class VotingApiService implements IVotingApiService {
	private static final String ENDPOINT = 'callout:VotingApi';
	private final HttpRequest req = new HttpRequest();

	public static IVotingApiService getInstance() {
		return new VotingApiService();
	}

	public void createVoteRegistration( VoteRegistrationModel voteRegistration ) {
		req.setEndpoint(ENDPOINT + '/vote_registrations/');
		req.setMethod('POST');
		req.setBody(JSON.serialize(voteRegistration));
		HttpResponse res = new Http().send(req);
		System.debug(res);
		System.debug(res.getBody());
		if( res.getStatusCode() != 200 ) {
			throw new VotingException();
		}
	}

	public void createVotes( List<VoteModel> votes ) {
		req.setEndpoint(ENDPOINT + '/votes/');
		req.setMethod('POST');
		req.setBody(JSON.serialize(votes));
		HttpResponse res = new Http().send(req);
		System.debug(res);
		System.debug(res.getBody());
		if( res.getStatusCode() != 200 ) {
			throw new VotingException();
		}
	}

	public List<String> getVotes( String voteRegistrationId ) {
		req.setEndpoint( ENDPOINT + '/answers/' + String.escapeSingleQuotes(voteRegistrationId));
		req.setMethod('GET');
		HttpResponse res = new Http().send(req);
		return (List<String>) JSON.deserialize(res.getBody(), List<String>.class);
	}
}