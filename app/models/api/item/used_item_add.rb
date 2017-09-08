class Api::Item::UsedItemAdd < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/used/item/add'
  end

  def request_method
     :post_token
  end
end
