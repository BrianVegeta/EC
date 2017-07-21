class ApiBase
  include HTTParty
  base_uri Settings.api_base_uri
  HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
  headers HEADERS

  attr_accessor :error_message, :error_code, :response_data, :response_headers

  def initialize params = nil, apitoken = nil
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
    self.error_code = response['error']['code']
    self.error_message = ::Response::ErrorCode.localize(self.error_code)
    self.response_data = response['data'] if response.has_key?('data')
    self.response_headers = response.headers

    handle_response_error
  end

  def handle_response_error
    case self.error_code
    when ::Response::ErrorCode::SUCCESS
      true
    else
      false
    end
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
