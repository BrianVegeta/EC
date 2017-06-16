class User::Sessions < User
  def initialize(params)
    @params = params

    @apitoken = nil
    @uid = nil
    @name = nil
    @password = params[:password]
  end

  def os_type=(value)
    @params[:os_type] = value
  end

  def device_type=(value)
    @params[:device_type] = value
  end

  def password
    @password
  end

  def apitoken
    @apitoken
  end

  def uid
    @uid
  end

  def name
    @name
  end

  def request_login
    response = self.class.post(@path, body: @params.to_json)
    case response.code
    when 200
      response
    when 404
      puts response.inspect
      raise 'NOT FOUND'
    else
      puts response.inspect
      raise "ZOMG ERROR #{response.code}"
    end
  end

  def login
    response = self.request_login
    error_code = response['error']['code']

    @error_message = ::Response::ErrorCode.localize(error_code)
    case error_code
    when ::Response::ErrorCode::SUCCESS
      set_user_profile(response)
      true
    else
      false
    end
  end
end
