class Api::Userprofile::BankInfoRequestOut < ApiAuthedBase
  
  PATH = '/client/user/bank_info/request_out';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end