require 'aes'
class Cypher

end


# https://github.com/chicks/aes
# require 'aes'
#
# # Generate a random key
# key = AES.key
#  => "290c3c5d812a4ba7ce33adf09598a462"
#
# # Encrypt a string.  Default output is base_64 encoded, init_vector and cipher_text are joined with "$"
# b64 = AES.encrypt("A super secret message", key)
#  => "IJjbgbv/OvPIAf4R5qAWyg==$fy0v7JwRX4kyAWflgouQlt9XGmiDKvbQMRHmQ+vy1fA="
#
# # Same as above but minus the base64 encoding, init_vector and cipher_text are shoved into an array
# plain = AES.encrypt("A super secret message", key, {:format => :plain}) #
#  => [";\202\222\306\376<\206\343\023\245\312\225\214KAm",
#      "C\343\023\323U~W>\023y\217\341\201\371\352\334\311^\307\352{\020 H(DVw\3224N\223"]
#
# # Generate a random initialization vector
# iv = AES.iv(:base_64)
#  => "IJjbgbv/OvPIAf4R5qAWyg=="
#
# # Encrypt a string, with a provided key and init_vector.
# b64_iv = AES.encrypt("A super secret message", key, {:iv => iv})
#  => "IJjbgbv/OvPIAf4R5qAWyg==$fy0v7JwRX4kyAWflgouQlt9XGmiDKvbQMRHmQ+vy1fA="
#
# AES.decrypt(b64, key)
#  => "A super secret message"
#
# AES.decrypt(plain, key, {:format => :plain})
#  => "A super secret message"
#
# # By default data is padded to the nearest 16 bytes block.  To turn
# # this off, you may use the :padding => false (or nil) option.
# #
# # In this mode however, the caller is required to pad the data.  In
# # the following example the message is exactly 16 bytes long, so no
# # error aries.
# msg = AES.encrypt("A secret message", key, {:padding => false})
#  => "SnD+WIfEfjZRrl+WAM/9pw==$89sGGZsu973j8Gl6aXC8Uw=="
#
# # Be sure to pass the same padding option when decrypting the
# # message, as it will fail if you try to decrypt unpadded data and
# # didn't specify :padding => false.
# AES.decrypt(msg, key, {:padding => false})
#  => "A secret message"
