/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class UserSelector implements IUserSelector {
	public static IUserSelector getInstance() {
		return new UserSelector();
	}

	public Set<Id> getCurrentUserLocationIds() {
		Id locationId = [
				SELECT Contact.PermanentResidenceLocation__c
				FROM User
				WHERE Id = :UserInfo.getUserId()
		].Contact.PermanentResidenceLocation__c;
		Set<Id> locationIds = new Set<Id> { locationId };
		while( true ) {
			Id upperLocation = [ SELECT Parent__c FROM Location__c WHERE Id = :locationId ].Parent__c;
			if( String.isBlank( upperLocation ) ) {
				break;
			}
			locationId = upperLocation;
			locationIds.add( locationId );
		}
		return locationIds;
	}

	public Id getCurrentUserAccountId() {
		return [ SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId() ].AccountId;
	}
}