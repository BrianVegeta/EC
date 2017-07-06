class Api::Contract::ReceiveGoods < ApiAuthedBase
  
  PATH = '/client/contract/receive_goods';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end