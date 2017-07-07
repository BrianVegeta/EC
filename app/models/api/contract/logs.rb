class Api::Contract::Logs < ApiAuthedBase
  
  PATH = '/client/contract/logs';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end