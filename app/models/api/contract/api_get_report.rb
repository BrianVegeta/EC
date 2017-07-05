class Api::Contract::ApiGetReport < ApiAuthedBase
  
  PATH = '/client/contract/get_report';
  
  def path
    PATH
  end

end