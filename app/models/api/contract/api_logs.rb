class Api::Contract::ApiLogs < ApiAuthedBase
  
  PATH = '/client/contract/logs';
  
  def path
    PATH
  end

end