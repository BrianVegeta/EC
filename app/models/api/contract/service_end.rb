class Api::Contract::ServiceEnd < ApiAuthedBase
  
  PATH = '/client/contract/service/end';
  
  def path
    PATH
  end
  
  def request_method
     :post_token
  end

end