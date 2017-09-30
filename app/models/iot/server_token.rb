module Iot
  class ServerToken

    TOKEN_CACHE_KEY = 'iot_server_token'

    def token
      token = Rails.cache.read(TOKEN_CACHE_KEY)
      if token.present?
        Rails.logger.debug "====>> TOKEN EXIST: #{token}."
        return token
      end
      Rails.logger.debug '====>> TOKEN NOT IN CACHE'
      request
      Rails.cache.read(TOKEN_CACHE_KEY)
    end

    def request
      Rails.logger.debug '====>> TOKEN CREATED AND SAVE TO CACHE'
      server_login = Api::ServerLogin.new
      server_login.request
      Rails.cache.write(TOKEN_CACHE_KEY, server_login.response_data)
    end
  end
end
