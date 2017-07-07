class Api::Item::CategoryList < ApiBase
  
  PATH = '/client/item/category/list';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end