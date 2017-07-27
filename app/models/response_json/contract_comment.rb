class ResponseJson::ContractComment
  class << self
    def structure
      {
        user_name: nil,
        #  -String
        user_img: nil,
        #  -String
        score: nil,
        #  -Float
        comment: nil,
        #  -String
        create_time: nil,
        #  -Long
      }
    end
  end
end
