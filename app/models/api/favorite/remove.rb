class Api::Favorite::Remove < ApiAuthedBase
  
  PATH = '/client/favorite/remove';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end