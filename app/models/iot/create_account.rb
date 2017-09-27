class Iot::CreateAccount < Iot::Payment

  attr_accessor :account_username, :account_pwd, :account_email, :account_phone,
                :account_name, :account_pwd_verify

  def syncCreateAccount()
    if (self.account_email.nil?)
      self.account_email = self.email
    end
    if (self.account_phone.nil?)
      self.account_phone = self.phone
    end
    if (self.account_name.nil?)
      self.account_name = self.user_name
    end
  end

end
