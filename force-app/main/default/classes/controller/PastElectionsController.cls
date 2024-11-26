/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class PastElectionsController {
	@AuraEnabled( Cacheable=true )
	public static List<ElectionTableModel> getPastElections() {
		Set <Id> locationIds = UserSelector.getInstance().getCurrentUserLocationIds();
		List<ElectionTableModel> elections = new List<ElectionTableModel>();

		for( Election__c election : ElectionSelector.getInstance().getPastElections( locationIds ) ) {
			elections.add( new ElectionTableModel( election ) );
		}

		return elections;
	}
}