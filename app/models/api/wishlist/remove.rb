class Api::Wishlist::Remove < ApiAuthedBase

  PATH = '/client/wish_list/remove';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
