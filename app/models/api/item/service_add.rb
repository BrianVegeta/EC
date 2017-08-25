class Api::Item::ServiceAdd < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/service/add'
  end

  def request_method
     :post_token
  end
end
