class Api::Contract::GetMyUnreadCount < ApiAuthedBase

  def path
    '/client/contract/getMyContractUnreadCount'
  end

  def request_method
     :post_token
  end

end
