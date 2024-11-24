/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class CurrentElectionsController {
	@AuraEnabled( Cacheable=true )
	public static List<ElectionTableModel> getCurrentElections() {
		Set <Id> locationIds = new Set<Id> { 'a02QI000006haCrYAI' };
		List<ElectionTableModel> elections = new List<ElectionTableModel>();

		for( Election__c election : ElectionSelector.getInstance().getCurrentElections( locationIds ) ) {
			elections.add( new ElectionTableModel( election ) );
		}

		return elections;
	}
}