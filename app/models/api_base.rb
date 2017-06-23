class ApiBase
  include HTTParty
  base_uri Settings.api_base_uri
  HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
  headers HEADERS

  attr_accessor :error_message, :error_code, :response_data

  def initialize params = nil
    self.request_params = params
  end

  def request_method
    :post
  end

  def request_api
    case self.request_method.to_sym
    when :post
      response = self.class.post(self.path, body: self.request_params.to_json)
    when :get
      response = self.class.get(self.path)
    else
      raise 'Need request method'
    end
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

  def request
    response = self.request_api
    self.error_message = ::Response::ErrorCode.localize(error_code)
    self.error_code = response['error']['code']
    self.response_data = response['data'] if response['data'].present?
    handle_response_error
  end

  def handle_response_error
    raise 'Need defind in subclass.'
  end

  def request_params
    @params
  end

  def request_params=(values)
    @params = values
  end

  def path
    raise 'Need defind in subclass.'
  end
end
