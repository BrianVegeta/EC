class ApiIotBase
  include HTTParty
  base_uri Settings.api_iot_base_uri
  HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
  headers HEADERS

  attr_accessor :error_message, :error_code,
                :response_data, :response_result, :response_headers,
                :iottoken

  def initialize params = nil, token = nil
    self.request_params = params
    self.iottoken = token
  end

  def request_method
    :post
  end

  def request_api
    case self.request_method.to_sym
    when :post
      response = self.class.post(
        self.path,
        body: self.request_params.to_json,
        headers: HEADERS.merge!({ IoT_Token: self.iottoken })
      )
    when :get
      response = self.class.get(self.path, headers: HEADERS.merge!({ IoT_Token: self.iottoken }))
    else
      raise 'Need request method'
    end
    case response.code
    when 200
      response
    when 404
      raise 'NOT FOUND'
    else
      raise "#{self.path}#{response.inspect}"
      raise "ZOMG ERROR #{response.code}"
    end
  end

  def request
    response = self.request_api
    self.response_result = response['result'] if response.has_key?('result')
    self.response_data = response['data'] if response.has_key?('data')
    self.response_headers = response.headers
    handle_response_error response
  end

  def handle_response_error response
    case response.code
    when 200
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
