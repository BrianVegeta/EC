class ResponseJson::ChatLog
  class << self
    def structure
      {
        id: nil,
        #  -Long
        type: [],
        #  -Object
        uid: nil,
        #  -String
        user_name: nil,
        #  -String
        user_img: nil,
        #  -String
        message: nil,
        #  -String
        arg1: nil,
        #  -String
        arg2: nil,
        #  -String
        arg3: nil,
        #  -String
        img: nil,
        #  -String
        is_receive: nil,
        #  -boolean
        is_read: nil,
        #  -boolean
        create_time: nil,
        #  -Long
      }
    end
  end
end
