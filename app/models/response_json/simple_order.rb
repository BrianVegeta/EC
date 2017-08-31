class ResponseJson::SimpleOrder
  class << self
    def structure
      {
        paymentinfo: nil,
        #  -String
        paymenttype: nil,
        #  -String
        payeruid: nil,
        #  -String
        amount: 0,
        #  -String
      }
    end
  end
end
