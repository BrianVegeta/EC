class ResponseJson::WishList
  class << self
    def structure
      {
        id: nil,
        #  -Long
        uid: nil,
        #  -String
        user_name: nil,
        #  -String
        user_img: nil,
        #  -String
        picture: nil,
        #  -String
        pname: nil,
        #  -String
        description: nil,
        #  -String
        city: nil,
        #  -String
        area: nil,
        #  -String
        expprice: nil,
        #  -Integer
        expcurrency: nil,
        #  -String
        expday: nil,
        #  -Integer
        cat_id: nil,
        #  -String
        category_name: nil,
        #  -String
        create_time: nil,
        #  -Long
      }
    end
  end
end
