class Api::Internal::GetOpenfireLoginToken < ApiAuthedBase

  def path
    '/internal/getOpenfireLoginToken'
  end

  def request_method
     :post_token
  end
end
