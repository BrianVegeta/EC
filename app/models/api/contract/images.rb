class Api::Contract::Images < ApiAuthedBase
  
  PATH = '/client/contract/images';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
end