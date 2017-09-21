class Api::Contract::CheckItemOngoing < ApiAuthedBase

  def path
    '/client/contract/is_item_exist_in_ongoing_contract'
  end

  def request_method
    :post_token
  end
end
