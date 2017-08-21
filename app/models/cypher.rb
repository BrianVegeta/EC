require "base64"
class Cypher

  #CONSTANT VARIABLE
  IV_SIZE = 16 # IV SIZE SHOULD BE SET TO SIZE OF 16, 32, 64... BASED ON ENCRIPTION REQUIREMENT
  KEY_SIZE = 16 # KEY SIZE 128 bits = 16 bytes

  def encrypt(original_data , uid)

     if (original_data.blank? || uid.blank?)
       raise 'original_data or uid is nil or empty string!!!'
     end
     # Generate Random Key
     aesKey =  SecureRandom.random_bytes(KEY_SIZE)

     # Start Encripting
     cipher = OpenSSL::Cipher.new('AES-128-CBC')
     cipher.encrypt
     cipher.key = aesKey
     cipher.iv = createIV(uid) # Generate IV by uid
     encrypted = cipher.update(original_data) + cipher.final

     b64_key = Base64.strict_encode64(aesKey)
     b64_data = Base64.strict_encode64(encrypted)
     b64_key[0..21].concat(b64_data)

  end

  def decrypt(encript_data , uid)
    if (encript_data.blank? || uid.blank? || (encript_data.length < 22))
      raise 'encript_data or uid is nil or empty string!!!'
    end

    # Parsing aesKey from data
    aesKey_string = encript_data[0..21].concat('==')
    aesKey = Base64.strict_decode64(aesKey_string)

    # Parsing encrypted from data
    encript_string = encript_data[22..-1]
    encrypted = Base64.strict_decode64(encript_string)

    # Start Decrypting
    cipher = OpenSSL::Cipher.new('AES-128-CBC')
    cipher.decrypt
    cipher.key = aesKey
    cipher.iv = createIV(uid)
    cipher.update(encrypted) + cipher.final

  end

  private
  # Return key generated from uid
  def createIV uid

    (uid.length > IV_SIZE) ? (key_over_flow uid) : (key_insert_empty uid)

  end

  # If key length is longer then IV_SIZE, trunk extra characters
  def key_over_flow key
    key[0..(IV_SIZE - 1)]
  end

  # If key length is shorter then IV_SIZE, insert 0
  def key_insert_empty key

    mod_result = key.last.bytes.first
    replace = '0' * (IV_SIZE - key.length)

    if mod_result.odd?
      "#{key}#{replace}"
    else
      "#{replace}#{key}"
    end
  end

end
