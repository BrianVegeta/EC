class Api::Favorite::Add < ApiAuthedBase
  
  PATH = '/client/favorite/add';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end