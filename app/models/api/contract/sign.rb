class Api::Contract::Sign < ApiAuthedBase
  
  PATH = '/client/contract/sign';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end