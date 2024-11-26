/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class ElectionTableModel {
	public ElectionTableModel( Election__c election ) {
		this.electionId = election.Id;
		this.electionName = election.Name;
		this.shortDescription = election.ShortDescription__c;
		this.electionUrl = '/voting/election-overview?electionId=' + election.Id;
	}

	@AuraEnabled
	public Id electionId { get; private set; }
	@AuraEnabled
	public String electionName { get; private set; }
	@AuraEnabled
	public String shortDescription { get; private set; }
	@AuraEnabled
	public String electionUrl { get; private set; }
}