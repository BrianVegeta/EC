class ResponseJson::ItemCategory
  class << self
    def structure
      {
        id: nil,
        #  -Integer
        level: nil,
        #  -Integer
        name: nil,
        #  -String
        sort: nil,
        #  -Integer
        charge_owner: nil,
        #  -Double
        charge_lessee: nil,
        #  -Double
        img: nil,
        #  -String
        children: [],
        #  -Object [ItemCategoryRsp]
      }
    end
  end
end
