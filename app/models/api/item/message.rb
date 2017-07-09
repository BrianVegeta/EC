class Api::Item::Message < ApiBase
  
  PATH = '/client/item/message';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end