class ApiAuthedBase < ApiBase
  attr_accessor :apitoken
  def initialize params, apitoken
    super
    self.apitoken = apitoken
  end

  def request_method
    :post_token
  end

  def request_api
    case self.request_method.to_sym
    when :post
      response = self.class.post(self.path, body: self.request_params.to_json)
    when :post_token
      response = self.class.post(
        self.path,
        body: self.request_params.to_json,
        headers: HEADERS.merge!({ apitoken: self.apitoken })
      )
    when :get
      response = self.class.get(self.path)
    when :get_token
      response = self.class.get(self.path, headers: HEADERS.merge!({ apitoken: self.apitoken }))
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
end
