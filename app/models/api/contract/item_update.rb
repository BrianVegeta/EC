class Api::Contract::ItemUpdate < ApiAuthedBase
  
  PATH = '/client/contract/item/update';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end