class User < ApiBase
  REGIST_EMIAL_PATH = '/client/register/email/regist'
  REGIST_PHONE_PATH = '/client/register/mobile/regist'

  VERIFY_EMAIL_PATH = '/client/register/email/verify'
  VERIFY_PHONE_PATH = '/client/register/mobile/verify'


  EMAIL_IDENTITY = :email
  PHONE_IDENTITY = :phone


  def initialize(params)
    @params = params
    @identity = identity
  end

  def os_type=(value)
    @params[:os_type] = value
  end

  def device_type=(value)
    @params[:device_type] = value
  end

  # identity [:email, :phone]
  def register
    request_body = @params.slice(@identity, :password).to_json
    response = self.class.post(register_path, body: request_body)
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
    request_body = @params.slice(@identity, verifycode_identity, :os_type, :device_type).to_json
    response = self.class.post(verify_path, body: request_body)
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

  def jwt_token
    @token = JWTWrapper.encode({ apitoken: 'test' });
  end

  def data_from_token
    JWTWrapper.decode @token
  end

  private
  def register_path
    case @identity
    when EMAIL_IDENTITY
      REGIST_EMIAL_PATH
    when PHONE_IDENTITY
      REGIST_PHONE_PATH
    end
  end

  def verify_path
    case @identity
    when EMAIL_IDENTITY
      VERIFY_EMAIL_PATH
    when PHONE_IDENTITY
      VERIFY_PHONE_PATH
    end
  end

  def verifycode_identity
    case @identity
    when EMAIL_IDENTITY
      :verifycode
    when PHONE_IDENTITY
      :sms
    end
  end

  def identity
    if @params[EMAIL_IDENTITY].present?
      EMAIL_IDENTITY
    elsif @params[PHONE_IDENTITY].present?
      PHONE_IDENTITY
    else
      raise "Identity out of #{EMAIL_IDENTITY} or #{PHONE_IDENTITY}"
    end
  end

  class << self
    def is_email(str)
      regex = Regexp.new('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$')
      return regex.match(str)
    end
  end
end
