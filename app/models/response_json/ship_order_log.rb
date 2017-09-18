class ResponseJson::ShipOrderLog
  class << self
    def structure
      {
        action: nil,
        #  -String
        status: nil,
        #  -String
        description: nil,
        #  -String
        action_time: nil,
        #  -String
        create_time: nil,
        #  -String
      }
    end
  end
end
