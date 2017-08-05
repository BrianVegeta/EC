class ResponseJson::UserCoupon
  class << self
    def structure
      {
        id: nil,
        #  -long
        name: nil,
        #  -String
        start_time: nil,
        #  -Long
        expiration_time: nil,
        #  -Long
        coupon_no: nil,
        #  -String
        amount: nil,
        #  -Double
        create_time: nil,
        #  -Long
      }
    end
  end
end
