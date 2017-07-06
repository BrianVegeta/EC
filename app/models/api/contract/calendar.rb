class Api::Contract::Calendar < ApiAuthedBase
  
  PATH = '/client/contract/calendar';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
   
end