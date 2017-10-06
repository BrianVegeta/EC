module Iot
  class Registration < Payment
    include InitializeParams

    attr_accessor :account, :password, :ip,
                  :login_error

    def build_payment
      self
    end

    def signin
      raise self.errors.inspect if !self.valid?

      server_token = ServerToken.new
      do_signin server_token.token
    end

    protected
    def do_signin token
      api_login = Api::Login.new initial_params, token
      api_login.request

      case api_login.error_code
      when Errors::CLIENT_APP_SESSION_404, Errors::CLIENT_APP_SESSION_498
        server_token = ServerToken.new
        server_token.request
        do_signin server_token.token
      when Errors::SUCCESS_200
        true
      when Errors::IOT_ACCOUNT_498
        self.login_error = '帳號停權'
        false
      else
        self.login_error = '帳號或密碼錯誤'
        false
      end
    end
  end
end
