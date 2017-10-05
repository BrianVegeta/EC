module Iot
  module Pay
    class Login < Base
      include Concerns::Auth
      attr_accessor :password


      def login_user browser_info
        return false if not self.valid?
        case identify_by.to_sym
        when :phone
          api = ::Auth::Session::LoginMobile.new phone_params, browser_info
        when :email
          api = ::Auth::Session::LoginEmail.new email_params, browser_info
        else
          raise 'invalid auth by'
        end
        set_user_login_as
        handle_response(api) || handle_response_error(api.error_message)
      end

      def sync_auth_email
        self.auth_email = email if self.auth_email.nil?
      end

      def sync_auth_phone
        self.auth_phone = phone if self.auth_phone.nil?
      end

      private
      def email_params
        {'email' => auth_email, 'password' => password}
      end

      def phone_params
        {'phone' => auth_phone, 'password' => password}
      end

      def handle_response api
        if api.request
          self.current_user = api.warden_session
          return true
        end
        false
      end

      def handle_response_error message
        self.errors.add :request, message
        return false
      end

    end
  end
end
