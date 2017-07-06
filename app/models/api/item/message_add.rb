class Api::Item::MessageAdd < ApiAuthedBase
  
  PATH = '/client/item/message/add';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end