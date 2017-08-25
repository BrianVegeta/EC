class Api::Item::SpaceUpdate < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/space/update'
  end

  def request_method
     :post_token
  end
end
