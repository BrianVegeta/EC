class Api::Item::Report < ApiAuthedBase
  
  PATH = '/client/item/report';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end