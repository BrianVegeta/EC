class Api::Search::Item < ApiBase

  PATH = '';

  def path
    params = self.request_params

    "/client/search/item/#{params['name']}/#{params['index']}/#{params['size']}"
  end

  def request_method
     :get
  end

end
