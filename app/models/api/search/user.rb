class Api::Search::User < ApiBase

  PATH = '';

  def path
    params = self.request_params

    "/client/search/user/#{params['name']}/#{params['index']}/#{params['size']}"
  end

  def request_method
     :get
  end

end
