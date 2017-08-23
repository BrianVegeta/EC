class Api::Item::GetItemByName < ApiBase

  PATH = '';

  def path
    params = self.request_params

    "/client/item/get_item_by_name/#{params['name']}/#{params['index']}/#{params['size']}"
  end


  def request_method
    :get
  end

end
