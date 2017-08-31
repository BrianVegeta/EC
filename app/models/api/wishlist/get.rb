class Api::Wishlist::Get < ApiBase

  PATH = '/client/wish_list/get';

  def path
    PATH
  end

  def request_method
     :post
  end

end
