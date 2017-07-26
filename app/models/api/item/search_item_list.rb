class Api::Item::SearchItemList < ApiBase

  PATH = '/client/item/search';

  def path
    PATH
  end

  def request_method
     :post
  end


end
