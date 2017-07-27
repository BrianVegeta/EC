class ResponseJson::SimpleItem
  class << self
    def structure
      {
        in_my_favorite: nil,
        #  -Boolean
        pid: nil,
        #  -Long
        uid: nil,
        #  -String
        owner_name: nil,
        #  -String
        owner_img: nil,
        #  -String
        pname: nil,
        #  -String
        pdes: nil,
        #  -String
        city: nil,
        #  -String
        area: nil,
        #  -String
        currency: nil,
        #  -String
        price: nil,
        #  -Integer
        img1: nil,
        #  -String
        favorite_count: nil,
        #  -Integer
        top_category: nil,
        #  -String
        create_time: nil,
        #  -Long
      }
    end
  end
end
