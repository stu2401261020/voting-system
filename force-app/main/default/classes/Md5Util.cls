/**
 * @description TODO:DESCRIPTION
 * @author Created by vassil.petkov@next-consult.com on 2024/11/24.
 */

public with sharing class Md5Util {
	public static String generateMd5Hash(String input) {
		return EncodingUtil.convertToHex(
				Crypto.generateDigest(
						'MD5',
						Blob.valueOf( input )
				)
		);
	}
}