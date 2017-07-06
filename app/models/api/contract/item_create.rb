class Api::Contract::ItemCreate < ApiAuthedBase
  
  PATH = '/client/contract/item/create';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end