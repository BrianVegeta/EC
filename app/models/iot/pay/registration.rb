module Iot
  module Pay
    class Registration < Base
      attr_accessor :identify_by,
                    :register_email,
                    :register_phone,
                    :password,
                    :password_confirmation,
                    :name,
                    :request_error

      validates :identify_by, presence: true, inclusion: { in: %w(email phone) }
      validates :register_email,  presence: true, email: true, if: :identify_by_email?
      validates :register_phone,  presence: true, phone: true, if: :identify_by_phone?

      def register
        self.valid?
        return self.valid?

        case identify_by.to_sym
        when :email
          raise 'test'
          registration = ::Auth::Registration::Email.new(email_params)
        when :phone
          registration = ::Auth::Registration::Phone.new(phone_params)
        end

        if registration.request
          true
        else
          self.request_error = registration.error_message
          false
        end
      end

      def sync_payment_info
        self.register_email = email
        self.register_phone = phone
        self.name = user_name
      end

      def identify_by_email?
        identify_by.present? && identify_by.to_sym == :email
      end

      def identify_by_phone?
        identify_by.present? && identify_by.to_sym == :phone
      end

      private
      def email_params
        {'email' => register_email, 'password' => password}
      end

      def phone_params
        {'phone' => register_phone, 'password' => password}
      end
    end
  end
end
