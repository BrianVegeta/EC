class Api::Item::MessageAdd < ApiBase
  
  PATH = '/client/item/message';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end