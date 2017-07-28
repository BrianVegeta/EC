class ResponseJson::ReadNotification
  class << self
    def structure
      {
        last_read_time: nil,
        #  -Long
        notifications: [],
        #  -String
      }
    end
  end
end
