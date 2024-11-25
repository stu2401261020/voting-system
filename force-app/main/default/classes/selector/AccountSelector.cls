/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class AccountSelector implements IAccountSelector {
	public static IAccountSelector getInstance() {
		return new AccountSelector();
	}

	public Account getAccountById( Id accountId ) {
		return [ SELECT PersonalIdentificationNumber__pc FROM Account WHERE Id = :accountId ];
	}
}