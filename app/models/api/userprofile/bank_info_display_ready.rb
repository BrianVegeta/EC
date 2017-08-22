class Api::Userprofile::BankInfoDisplayReady < ApiAuthedBase

  PATH = '/client/user/bank_info/display_ready';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
