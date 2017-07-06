class Api::Item::SpaceAdd < ApiAuthedBase
  
  PATH = '/client/item/space/add';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end