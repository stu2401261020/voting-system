/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class VoteModel {
	public VoteModel( String voteRegistrationId, String answer ){
		this.vote_registration_id = voteRegistrationId;
		this.answer = answer;
	}

	public String vote_registration_id { get; private set; }
	public String answer { get; private set; }
}