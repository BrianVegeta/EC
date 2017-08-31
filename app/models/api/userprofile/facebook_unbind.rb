class Api::Userprofile::FacebookUnbind < ApiAuthedBase
  include HandleError::FacebookBind

  def path
    '/client/user/facebook/unbind'
  end

  def request_method
     :post_token
  end

end
