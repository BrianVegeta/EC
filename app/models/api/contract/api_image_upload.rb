class Api::Contract::ApiImageUpload  < ApiAuthedBase
  PATH = '/client/contract/image/upload';
  
  def path
    PATH
  end

end