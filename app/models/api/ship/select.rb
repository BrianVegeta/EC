class Api::Ship::Select
  include HTTParty
  HEADERS = { 'Content-Type' => 'application/json' }
  headers HEADERS

  PATH = 'http://debug.shareapp.com.tw:18080/ShareAPI/client/ship/7-11/store/selector/pc';

  def initialize params, apitoken
    self.request_params = params
    self.apitoken = apitoken
  end

  def request
    response = HTTParty.post(
      PATH,
      body: self.request_params.to_json,
      headers: HEADERS.merge!({ apitoken: self.apitoken })
    )
    response.parsed_response
  end

  def request_params
    @params
  end

  def request_params=(values)
    @params = values
  end

  def apitoken
    @apitoken
  end

  def apitoken=(values)
    @apitoken = values
  end

end
