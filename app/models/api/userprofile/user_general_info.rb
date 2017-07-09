class Api::Userprofile::UserGeneralInfo < ApiBase
  
  PATH = '/client/user/general_user_info';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end