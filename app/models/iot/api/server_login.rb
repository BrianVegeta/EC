module Iot
  module Api
    class ServerLogin < Base

      CERTIFICATION = 'mYteQnom66OAOYkwnxXcyMSual3bM0qLzWlDGsmr+DrJ6yEpMQBxjTrgoVh8O3lVNqoAb2DY+DpqYZteGLX+WzRUN1SBeF93iCWqNpd7ICg='
      SHAREEC_CLIENT_UID = 'SAI_CA_B0009E2O'

      def path
        '/session/server/login'
      end

      def request_method
         :post
      end

      def initialize params = nil, token = nil
        super
        self.request_params = {
          client_app_uid: SHAREEC_CLIENT_UID,
          certification: CERTIFICATION,
        }
      end
    end
  end
end
