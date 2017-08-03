class ResponseJson::GoodItem
  class << self
    def structure
      {
        ItemTitle: nil,
        #  -String
        Item: []
        #  -Object [SimpleItemRsp]
      }
    end
  end
end
