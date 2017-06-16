class User::Verification < User

  def initialize(params, current_user)
    @params = params
    @error_message = ''

    @apitoken = nil
    @uid = nil
    @name = nil
    @password = current_user['password']
    @path = ''
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

  def request_verification
    raise 'ERROR' if @path.blank?
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

  def verify
    response = self.request_verification
    error_code = response['error']['code']
    @error_message = ::Response::ErrorCode.localize(error_code)
    case error_code
    when ::Response::ErrorCode::SUCCESS
      user_profile = response['data']['user_profile']
      @apitoken = response.headers['apitoken']
      @uid = user_profile['uid']
      @name = user_profile['name']
      true
    when ::Response::ErrorCode::VERIFY_CODE_NOT_CORRECT
      false
    when ::Response::ErrorCode::USER_NOT_EXIST
      false
    else
      false
    end
  end
end
