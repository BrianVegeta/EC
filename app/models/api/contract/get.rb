class Api::Contract::Get < ApiAuthedBase
  
  PATH = '/client/contract/get';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end