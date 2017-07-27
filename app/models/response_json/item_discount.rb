class ResponseJson::ItemDiscount
  class << self
    def structure
      {
        type: nil,
        #  -String
        # GREATER_OR_EQUAL_TO_N_DAY , GREATER_OR_EQUAL_TO_N_MONTH , GREATER_OR_EQUAL_TO_N_COUNT , FIX
        param: nil,
        #  -Integer
        discount: nil,
        #  -Integer
      }
    end
  end
end
