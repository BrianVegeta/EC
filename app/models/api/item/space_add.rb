class Api::Item::SpaceAdd < ApiAuthedBase
  include ItemPublishHandleError

  def path
    '/client/item/space/add'
  end

  def request_method
     :post_token
  end
end
