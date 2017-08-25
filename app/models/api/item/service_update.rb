class Api::Item::ServiceUpdate < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/service/update'
  end

  def request_method
     :post_token
  end
end
