class Api::Contract::SpaceEnd < ApiAuthedBase
  
  PATH = '/client/contract/space/end';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end