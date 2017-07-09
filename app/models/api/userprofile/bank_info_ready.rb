class Api::Userprofile::BankInfoReady < ApiAuthedBase
  
  PATH = '/client/user/bank_info/ready';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end