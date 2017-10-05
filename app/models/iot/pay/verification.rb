module Iot
  module Pay
    class Verification < Base
      attr_accessor :identify_by,
                    :register_email,
                    :register_phone,
                    :name,
                    :password,
                    :verify_code

      validates :identify_by, presence: true, inclusion: { in: %w(email phone) }
      validates :register_email,  presence: true, email: true, if: :identify_by_email?
      validates :register_phone,  presence: true, phone: true, if: :identify_by_phone?
      validates :password, presence: true, length: { in: 8..12 }
      validates :name, presence: true
      validates :verify_code, presence: true, length: { is: 4 }

      def verify browser_info
        # raise email_params.inspect

        return false if not self.valid?
        case identify_by.to_sym
        when :email
          api = ::Auth::Verification::Email.new email_params, browser_info
          self.user_login_as = register_email
        when :phone
          self.user_login_as = register_phone
          api = ::Auth::Verification::Phone.new phone_params, browser_info
        end

        handle_request(api) || handle_request_error(api.error_message)
      end

      def identify_by_email?
        identify_by.present? && identify_by.to_sym == :email
      end

      def identify_by_phone?
        identify_by.present? && identify_by.to_sym == :phone
      end

      def update_name apitoken
        return if name.present?
        return if current_user.nil?
        begin
          api = ::Api::Userprofile::Save.new username_params, apitoken
          api.request
        rescue Exception => e
          raise e.inspect
        end
      end

      private
      def email_params
        {
          'email' => register_email,
          'verifycode' => verify_code,
          'password' => password,
        }
      end

      def phone_params
        {
          'phone' => register_phone,
          'sms' => verify_code,
          'password' => password,
        }
      end

      def username_params
        {
          'name' => name,
          'uid' => current_user['uid']
        }
      end

      def handle_request_error message
        self.errors.add :request, message
        return false
      end

      def handle_request api
        if api.request
          self.current_user = api.warden_session
          return true
        end
        false
      end

    end
  end
end
