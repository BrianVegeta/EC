class Api::Contract::GetUnreadContract < ApiAuthedBase

  PATH = '/client/contract/getMyContractUnreadCount';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
