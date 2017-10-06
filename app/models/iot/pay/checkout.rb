module Iot
  module Pay
    class Checkout < Base
      attr_accessor :current_user, :esun_form

      def checkout
        apitoken = self.current_user['apitoken']
        @esun = ::Api::Payment::IotCreditcardEsun.new esun_params, apitoken
        @esun.request
        self.esun_form = @esun.response_data
      end

      def esun_params
        initial_params.merge current_user.slice('uid')
      end
    end
  end
end
