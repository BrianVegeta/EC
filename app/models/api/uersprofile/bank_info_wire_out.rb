class Api::Userprofile::BankInfoWireOut < ApiAuthedBase
  
  PATH = '/client/user/bank_info/wire_out';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end