class ResponseJson::ItemCancelPolicy
  class << self
    def structure
      {
        advance_day: nil,
        #  -Integer
        # 提前退訂天數
        rate: nil,
        #  -Integer
        #  扣除分享金的%數
      }
    end
  end
end
