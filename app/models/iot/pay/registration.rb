module Iot
  module Pay
    class Registration < Base
      include Concerns::Auth
      attr_accessor :name,
                    :password,
                    :password_confirmation

      validates :password, presence: true, length: { in: 8..12 }, confirmation: true
      validates :name, presence: true

      def register
        return false if not self.valid?
        case identify_by.to_sym
        when :email
          api = ::Auth::Registration::EmailByIotOrder.new(email_params)
        when :phone
          api = ::Auth::Registration::PhoneByIotOrder.new(phone_params)
        end
        set_user_login_as
        handle_response(api) || handle_response_error(api.error_message)
      end

      def sync_payment_info
        self.auth_email = email if auth_email.nil?
        self.auth_phone = phone if auth_phone.nil?
        self.name = user_name if user_name.nil?
      end

      private
      def resource_params
        {
          resource: initial_params.slice(
            :resource_app_uid, :resource_app_order_no,
            :product_name, :price, :unit,
            :app_user_pk, :user_name, :email, :phone,
            :checksum, :arg
          )
        }
      end

      def email_params
        {
          'email' => auth_email,
          'password' => password,
        }.merge resource_params
      end

      def phone_params
        {
          'phone' => auth_phone,
          'password' => password,
        }.merge resource_params
      end

      def resend_email_verification
        api = ::Auth::Verification::EmailResend.new({ 'email' => auth_email })
        api.request
      end

      def resend_phone_verification
        api = ::Auth::Verification::PhoneResend.new({ 'phone' => auth_phone })
        api.request
      end

      def handle_response api
        if api.request
          true
        elsif Response::ErrorCode::USER_EMAIL_NOT_VERIFY
          resend_email_verification
          true
        elsif Response::ErrorCode::USER_MOBILE_NOT_VERIFY
          resend_phone_verification
          true
        else
          false
        end
      end

      def handle_response_error message
        self.errors.add :request, message
        return false
      end

    end
  end
end
