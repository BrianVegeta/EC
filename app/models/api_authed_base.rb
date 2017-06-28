class ApiAuthedBase < ApiBase
  attr_accessor :apitoken
  def initialize params, apitoken
    super
    self.apitoken = apitoken
  end

  def request_api
    response = self.class.post(
      self.path,
      body: self.request_params.to_json,
      headers: HEADERS.merge!({ apitoken: self.apitoken }),
    )
    case response.code
    when 200
      response
    when 404
      raise 'NOT FOUND'
    else
      raise response.inspect
      raise "ZOMG ERROR #{response.code}"
    end
  end
end
