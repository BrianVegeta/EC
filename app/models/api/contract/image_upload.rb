class Api::Contract::ImageUpload  < ApiAuthedBase
  PATH = '/client/contract/image/upload';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end