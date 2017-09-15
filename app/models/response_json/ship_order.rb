class ResponseJson::ShipOrder
  class << self
    def structure
      {
        logistics_type: nil,
        #  -String
        send_type: nil,
        #  -String
        orderno: nil,
        #  -String
        total: nil,
        #  -String
        stage: nil,
        #  -String
        max_send_time: 0,
        #  -Long
        create_time: 0,
        #  -Long
      }
    end
  end
end
