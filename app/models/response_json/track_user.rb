class ResponseJson::TrackUser
  class << self
    def structure
      {
        uid: nil,
        #  -String
        name: nil,
        #  -String
        img: nil,
        #  -String
        city: nil,
        #  -String
        area: nil,
        #  -String
      }
    end
  end
end
