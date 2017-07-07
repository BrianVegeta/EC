class Api::Item::ServiceUpdate < ApiAuthedBase
  
  PATH = '/client/item/service/update';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end