class Api::Item::GetItem < ApiBase
  
  PATH = '/client/item/get_item';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
  
end