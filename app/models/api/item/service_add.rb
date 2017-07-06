class Api::Item::ServiceAdd < ApiAuthedBase
  
  PATH = '/client/item/service/add';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end