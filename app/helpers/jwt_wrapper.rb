module JWTWrapper
  extend self

  def encode(payload, expiration = nil)
    payload = payload.dup
    return if payload.nil?
    return unless payload.is_a? Hash

    expiration ||= Settings.jwt.expiration_hours
    payload['exp'] = expiration.to_i.hours.from_now.to_i
    JWT.encode payload, Settings.jwt.secret
  end

  def decode(token)
    begin
      decoded_token = JWT.decode token, Settings.jwt.secret
      decoded_token.first
    rescue
      nil
    end
  end
end
