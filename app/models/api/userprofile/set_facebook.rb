class Api::Userprofile::SetFacebook < ApiAuthedBase
  include HandleError::FacebookBind

  PATH = '/client/user/set_facebook';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
