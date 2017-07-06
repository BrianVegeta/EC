class Api::Item::RelativeItem < ApiBase
  
  PATH = '/client/item/relative_item';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end