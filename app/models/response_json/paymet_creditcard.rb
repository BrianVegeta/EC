class ResponseJson::PaymentCreditcard
  class << self
    def structure
      {
        data: nil,
        #  -String
        mac: nil,
        #  -String
        ksn: nil,
        #  -String
        redirect: nil,
        #  -String
      }
    end
  end
end
