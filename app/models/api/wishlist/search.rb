class Api::Wishlist::Search < ApiBase
  
  PATH = '/client/wish_list/search';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end