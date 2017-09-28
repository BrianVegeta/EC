module Iot
  module Api
    class Base
      include HTTParty
      base_uri Settings.api_iot_base_uri
      HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
      headers HEADERS

      attr_accessor :error_message, :error_code,
                    :response_data, :response_result, :response_headers,
                    :iottoken, :request_params

      def initialize params = nil, token = nil
        self.request_params = params
        self.iottoken = token
      end

      def request_method
        :post
      end

      def request_api
        response = http_request

        case response.code
        when 200
          response
        when 404
          raise 'NOT FOUND'
        else
          raise "ZOMG ERROR #{response.inspect} #{path}"
        end
      end

      def request
        response = self.request_api
        if response.has_key? 'result'
          self.response_result = response['result']
          self.error_code = response['result']['code']
        end
        self.response_data = response['data'] if response.has_key?('data')
        self.response_headers = response.headers
        handle_response_error response
      end

      def handle_response_error response
        case response.code
        when 200
          true
        else
          false
        end
      end

      # def request_params
      #   @params
      # end
      #
      # def request_params=(values)
      #   @params = values
      # end

      def path
        raise 'Need defind in subclass.'
      end

      protected
      def request_body
        self.request_params.to_json
      end

      def request_headers
        HEADERS.merge IoT_Token: self.iottoken
      end

      def http_request
        case self.request_method.to_sym
        when :post
          self.class.post path, body: request_body, headers: request_headers
        when :get
          self.class.get path, headers: request_headers
        else
          raise 'Need request method'
        end
      end
    end
  end
end
