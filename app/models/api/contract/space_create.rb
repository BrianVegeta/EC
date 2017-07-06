class Api::Contract::SpaceCreate < ApiAuthedBase
  
  PATH = '/client/contract/space/create';
  
  def path
    PATH
  end
  
  def request_method
     :post_token
  end
  

end