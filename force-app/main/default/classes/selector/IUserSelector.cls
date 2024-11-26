/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public interface IUserSelector {
	Set<Id> getCurrentUserLocationIds();
	Id getCurrentUserAccountId();
}