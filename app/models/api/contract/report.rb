class Api::Contract::Report < ApiAuthedBase
  
  PATH = '/client/contract/report';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end