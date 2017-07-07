class Api::Contract::ShipGoods < ApiAuthedBase
  
  PATH = '/client/contract/ship_goods';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end