module Iot
  module Pay
    class Login < Base
      attr_accessor :auth_email,
                    :auth_phone,
                    :password,
                    :identify_by

      validates :identify_by, presence: true, inclusion: { in: %w(email phone) }
      validates :auth_email, presence: true, email: true, if: :identify_by_email?
      validates :auth_phone, presence: true, phone: true, if: :identify_by_phone?


      def login_user browser_info
        case identify_by.to_sym
        when :phone
          self.user_login_as = phone
          api = ::Auth::Session::LoginMobile.new phone_params, browser_info
        when :email
          self.user_login_as = email
          api = ::Auth::Session::LoginEmail.new email_params, browser_info
        else
          raise 'invalid auth by'
        end
        handle_response(api) || handle_response_error(api.error_message)
      end


      def identify_by_email?
        identify_by.present? && identify_by.to_sym == :email
      end

      def identify_by_phone?
        identify_by.present? && identify_by.to_sym == :phone
      end

      def sync_payment_info
        self.auth_email = email
        self.auth_phone = phone
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
