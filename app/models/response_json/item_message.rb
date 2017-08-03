class ResponseJson::ItemMessage
  class << self
    def structure
      {
        user_uid: nil,
        #  -String
        user_name: nil,
        #  -String
        user_image: nil,
        #  -String
        tag_uid: nil,
        #  -String
        tag_user_name: nil,
        #  -String
        message: nil,
        #  -String
        create_time: nil,
        #  -Long
      }
    end
  end
end
