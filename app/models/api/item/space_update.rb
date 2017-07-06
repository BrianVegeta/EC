class Api::Item::SpaceUpdate < ApiAuthedBase
  
  PATH = '/client/item/space/update';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end