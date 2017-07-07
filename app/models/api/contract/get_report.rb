class Api::Contract::GetReport < ApiAuthedBase
  
  PATH = '';
  
  def path
    params = self.request_params
    
    "/client/contract/get_report/#{params['uid']}"
  end


  def request_method
    :get_token
  end
  
end