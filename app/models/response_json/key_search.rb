class ResponseJson::KeySearch
  class << self
    def structure
      {
        type: nil,
        #  -String
        #  ITEM, USER, WISH
        id_no: nil,
        #  -String
        name: nil,
        #  -String
        img: nil,
        #  -String
        create_time: nil,
        #  -Long
      }
    end
  end
end
