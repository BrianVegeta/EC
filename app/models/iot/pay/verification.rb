module Iot
  module Pay
    class Verification < Base
      attr_accessor :register_email,
                    :register_phone,
                    :password,
                    :name,
                    :identify_by,
                    :verify_code,
                    :request_error

      def verify
        raise 'verify'
      end

      def identify_by_email?
        identify_by.present? && identify_by.to_sym == :email
      end

      def identify_by_phone?
        identify_by.present? && identify_by.to_sym == :phone
      end
    end
  end
end
