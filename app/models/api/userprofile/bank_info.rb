class Api::Userprofile::BankInfo < ApiAuthedBase
  
  PATH = '/client/user/bank_info';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end