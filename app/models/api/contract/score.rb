class Api::Contract::Score < ApiAuthedBase
  
  PATH = '/client/contract/score';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end