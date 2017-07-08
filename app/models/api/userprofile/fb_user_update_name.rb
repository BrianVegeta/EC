class Api::Userprofile::FbUserUpdateName < ApiAuthedBase
  
  PATH = '/client/user/fb_user/update_name';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end