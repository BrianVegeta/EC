class Api::Ship::Select
  include HTTParty

  def initialize params
    self.request_params
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
