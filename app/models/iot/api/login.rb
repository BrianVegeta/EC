module Iot
  module Api
    class Login < Base

      def path
        '/session/IoTAccount/login'
      end

      def request_method
         :post
      end
    end
  end
end
