class Api::Item::ItemUpdate < ApiAuthedBase
  
  PATH = '/client/item/item/update';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end