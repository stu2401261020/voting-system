/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class VoteRegistrationModel {
	public VoteRegistrationModel( String voteRegistrationId ) {
		this.vote_registration_id = voteRegistrationId;
	}

	public String vote_registration_id { get; private set; }
}