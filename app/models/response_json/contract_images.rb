class ResponseJson::ContractImages
  class << self
    def structure
      {
        OWNER_SEND: [],
        #  -String
        LESSEE_RECEIVE: [],
        #  -String
        LESSEE_SEND: [],
        #  -Float
        OWNER_RECEIVE: [],
      }
    end
  end
end
