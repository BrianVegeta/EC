module Iot
  module Pay
    class Login < Base
      attr_accessor :password, :login_by,
                    :login_error,
                    :user_login_as

      def login_user browser_info
        if login_by_phone?
          self.user_login_as = phone
          params = {'phone' => phone, 'password' => password}
          session = ::Auth::Session::LoginMobile.new  params, browser_info
        elsif login_by_email?
          self.user_login_as = email
          params = {'email' => email, 'password' => password}
          session = ::Auth::Session::LoginEmail.new params, browser_info
        else
          raise 'invalid input'
        end
        if session.request
          self.current_user = session.warden_session
          true
        else
          self.login_error = session.error_message
          false
        end
      end

      def login_by_email?
        login_by.to_s === 'email'
      end

      def login_by_phone?
        login_by.to_s === 'phone'
      end
    end
  end
end
