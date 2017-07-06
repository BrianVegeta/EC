class Api::Contract::FindCanReport < ApiAuthedBase
  
  PATH = '/client/contract/findCanReport';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end