class Api::Search::Wish < ApiBase

  PATH = '';

  def path
    params = self.request_params

    "/client/search/wish/#{params['name']}/#{params['index']}/#{params['size']}"
  end

  def request_method
     :get
  end

end
