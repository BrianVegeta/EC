class ResponseJson::Sample
  class << self
    def structure
      {
        uid: nil,
        #  -String
        name: nil,
        #  -String
        img: nil,
        #  -String
        autobiography: nil,
        #  -String
        items: [],
        #  -Object [SimpleItemRsp]
      }
    end
  end
end
