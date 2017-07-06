class Api::Item::RemoveItems < ApiAuthedBase
  
  PATH = '/client/item/remove_items';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end