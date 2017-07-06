class Api::Contract::Cancel < ApiAuthedBase
  
  PATH = '/client/contract/cancel';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end