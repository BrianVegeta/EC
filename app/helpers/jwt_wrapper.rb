module JWTWrapper
  extend self

  def encode(payload, expiration = nil)
    expiration ||= Settings.jwt_expiration

    payload = payload.dup
    payload['exp'] = expiration.to_i.hours.from_now.to_i
    JWT.encode payload, Settings.jwt_secret
  end

  def decode(token)
    begin
      decoded_token = JWT.decode token, Settings.jwt_secret
      decoded_token.first
    rescue
      nil
    end
  end
end
