class ResponseJson::Favorite
  class << self
    def structure
      {
        uid: nil,
        #  -String
        pid: nil,
        #  -Long
        pname: nil,
        #  -String
        pdes: nil,
        #  -String
        price: nil,
        #  -Integer
        currency: nil,
        #  -String
        img1: nil,
        #  -String
        create_time: nil,
        #  -long
      }
    end
  end
end
