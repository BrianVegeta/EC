class Api::Contract::EndContract < ApiAuthedBase
  
  PATH = '/client/contract/end_contract';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end