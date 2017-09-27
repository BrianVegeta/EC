class Iot::Login < Iot::Payment
  attr_accessor :account, :password, :login_response, :ip

  def login_success?
    self.login_response.present?
  end

  def signin
    raise 'error' if !self.valid?

    login_params = {
      client_app_uid: self.client_app_uid,
      account: self.account,
      password: self.password,
      ip: self.ip,
    }
    obj = ::Api::Iot::Login.new login_params, '02ac89b2-68dd-422b-8534-5b4c9019a32a'
    success = obj.request
    self.login_response = obj.response_data
    self.login_response.present?
  end
end
