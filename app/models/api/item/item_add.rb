class Api::Item::ItemAdd < ApiAuthedBase
  
  PATH = '/client/item/item/add';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end