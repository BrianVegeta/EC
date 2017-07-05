class Api::Contract::MyFavorite < ApiAuthedBase
  
  PATH = '/client/favorite/my_favorite';
  
  def path
    PATH
  end

end