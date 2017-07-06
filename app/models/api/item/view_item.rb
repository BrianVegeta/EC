class Api::Item::ViewItem < ApiBase
  
  PATH = '/client/item/view_item';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
  
end