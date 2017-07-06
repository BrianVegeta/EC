class Api::Contract::Reject < ApiAuthedBase
  
  PATH = '/client/contract/reject';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end