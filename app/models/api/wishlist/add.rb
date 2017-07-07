class Api::Wishlist::Save < ApiAuthedBase
  
  PATH = '/client/wish_list/save';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end