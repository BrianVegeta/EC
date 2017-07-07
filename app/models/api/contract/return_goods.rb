class Api::Contract::ReturnGoods < ApiAuthedBase
  
  PATH = '/client/contract/return_goods';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end