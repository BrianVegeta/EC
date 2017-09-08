class Api::Item::UsedItemUpdate < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/used/item/update'
  end

  def request_method
     :post_token
  end
end
