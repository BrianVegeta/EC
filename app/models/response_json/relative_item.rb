class ResponseJson::RelativeItem
  class << self
    def structure
      {
        pid: nil,
        #  -Long
        name: nil,
        #  -String
        price: nil,
        #  -Integer
        img1: nil,
        #  -String
      }
    end
  end
end
