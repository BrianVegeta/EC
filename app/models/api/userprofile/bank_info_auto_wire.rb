class Api::Userprofile::BankInfoAutoWire < ApiAuthedBase
  
  PATH = '/client/user/bank_info/auto_wire';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end