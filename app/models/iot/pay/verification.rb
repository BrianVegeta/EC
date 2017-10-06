module Iot
  module Pay
    class Verification < Base
      include Concerns::Auth
      attr_accessor :name,
                    :password,
                    :verify_code

      validates :password, presence: true, length: { in: 8..12 }
      validates :name, presence: true
      validates :verify_code, presence: true, length: { is: 4 }

      def verify browser_info
        return false if not self.valid?
        case identify_by.to_sym
        when :email
          api = ::Auth::Verification::Email.new email_params, browser_info
        when :phone
          api = ::Auth::Verification::Phone.new phone_params, browser_info
        end
        set_user_login_as
        handle_request(api) || handle_request_error(api.error_message)
      end

      def update_name
        return unless name.present?
        return if current_user.nil?

        begin
          api = ::Api::Userprofile::Save.new username_params, current_user['apitoken']
          if api.request
            updated_user = current_user
            updated_user['name'] = name
            self.current_user = updated_user
          else
            raise api.inspect
          end
        rescue Exception => e
          raise e.inspect
        end
      end

      private
      def email_params
        {
          'email' => auth_email,
          'verifycode' => verify_code,
          'password' => password,
        }
      end

      def phone_params
        {
          'phone' => auth_phone,
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
          true
        elsif Response::ErrorCode::USER_EXIST
          # self.current_user = api.warden_session
          true
        else
          false
        end
      end

    end
  end
end
