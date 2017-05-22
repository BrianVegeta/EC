class UserLogin < ApiBase
  PATH = '/client/session/email/login'

  def initialize(email, password, os_type = 'test', device_type = 'test')
    @options = {
      body: {
        email: email,
        password: password,
        os_type: os_type,
        device_type: device_type,
      }.to_json
    }
  end

  def getApiToken
    response = self.class.post(PATH, @options)
    case response.code
    when 200
      response.headers['apitoken']
    when 404
      raise 'NOT FOUND'
    else
      p response.inspect
      raise "ZOMG ERROR #{response.code}"
    end
  end
end
