class Api::Item::GetItemByUser < ApiBase

  PATH = '';

  def path
    params = self.request_params

    "/client/item/get_item_by_user/#{params['uid']}"
  end

  def request_method
    :get
  end

end
