class Api::Item::ItemUpdate < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/item/update'
  end

  def request_method
     :post_token
  end
end
