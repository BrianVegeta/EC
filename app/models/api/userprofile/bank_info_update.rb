class Api::Userprofile::BankInfoUpdate < ApiAuthedBase

  PATH = '/client/user/bank_info/update/ec';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
