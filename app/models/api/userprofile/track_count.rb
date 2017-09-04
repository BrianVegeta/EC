class Api::Userprofile::TrackCount < ApiBase

  PATH = '/client/user/track_count';

  def path
    PATH
  end

  def request_method
     :post
  end

end
