class User::Registration < User
  def initialize(params)
    @params = params
    @error_message = ''
    @path = ''
  end

  def password
    @params[:password]
  end

  def request_registration
    response = self.class.post(@path, body: @params.to_json)
    case response.code
    when 200
      response
    when 404
      puts response.inspect
      raise 'NOT FOUND'
    else
      puts response.inspect
      raise response.inspect
      raise "ZOMG ERROR #{response.code}"
    end
  end

  def register
    response = self.request_registration
    error_code = response['error']['code']

    @error_message = ::Response::ErrorCode.localize(error_code)
    case error_code
    when ::Response::ErrorCode::SUCCESS
      true
    when ::Response::ErrorCode::NEW_EMAIL_ALREADY_EXIST
      false
    when ::Response::ErrorCode::NEW_MOBILE_ALREADY_EXIST
      false
    else
      true
    end
  end
end
