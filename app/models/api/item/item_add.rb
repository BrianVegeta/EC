class Api::Item::ItemAdd < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/item/add'
  end

  def request_method
     :post_token
  end
end
