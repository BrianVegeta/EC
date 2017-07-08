class Api::Userprofile::TrackCount < ApiAuthedBase
  
  PATH = '/client/user/track_count';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end