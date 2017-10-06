module Iot
  module Pay
    class Checkout < Base
      attr_accessor :current_user, :esun_form

      def checkout
        apitoken = self.current_user['apitoken']
        api = ::Api::Payment::IotCreditcardEsun.new esun_params, apitoken
        api.request
        case api.error_code
        when Response::ErrorCode::SUCCESS
          self.esun_form = api.response_data
        when Response::ErrorCode::CONSTRACT_STAGE_ERROR
          self.esun_form = nil
        else
          raise 'ESUN REQUEST FORM ERROR.'
        end
      end

      def esun_params
        initial_params.merge current_user.slice('uid')
      end
    end
  end
end
