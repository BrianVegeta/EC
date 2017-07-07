class Api::Item::SearchItemList < ApiBase
  
  PATH = '/client/item/get_item/condition_search/page_list';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
  
end