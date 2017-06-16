class JsonWebToken < ::Warden::Strategies::Base
  def valid?
    headers.present? && headers['Authorization'].present?
  end

  def authenticate!
    return fail!
    return fail! unless claims
    success!({ test: params['user'], header: headers['Cookie'] })
  end

  protected ######################## PROTECTED #############################
  def headers
    env['CUS_HTTP_HEADER']
  end
  def params
    env['action_dispatch.request.parameters']
  end
  def claims
    strategy, token = headers['Authorization'].split(' ')
    return nil if (strategy || '').downcase != 'bearer'
    JWTWrapper.decode(token) rescue nil
  end
end
