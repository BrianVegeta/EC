class ResponseJson::CartItem
  class << self
    def structure
      {
        pid: nil,
        #  -Long
        uid: nil,
        #  -String
        pname: nil,
        #  -String
        pdes: nil,
        #  -String
        city: nil,
        #  -String
        area: nil,
        # -String
        currency: nil,
        # -String
        price: nil,
        # -Integer
        img1: nil,
        # -String
        create_time : nil,
        # - Long (millisecond)
      }
    end
  end
end
