class Api::Contract::Read < ApiAuthedBase
  
  PATH = '/client/contract/read';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end