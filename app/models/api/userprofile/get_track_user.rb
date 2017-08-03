class Api::Userprofile::GetTrackUser < ApiAuthedBase
  
  PATH = '/client/user/getTrackUser';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end