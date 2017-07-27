class ResponseJson::TrackUserCount
  class << self
    def structure
      {
        tracked_user_count: nil,
        #  -int
        fans_count: nil,
        #  -int
      }
    end
  end
end
