module Iot
  module Api
    class OrderBindWithUser < Base

      def path
        '/payment/handler/order/bind_with_user'
      end

      def request_method
         :post
      end
    end
  end
end
