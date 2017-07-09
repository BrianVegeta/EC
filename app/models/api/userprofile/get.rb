class Api::Userprofile::Get < ApiAuthedBase

  PATH = '/client/user/get'

  def path
    PATH
  end

  def request_method
    :post_token
  end
end
