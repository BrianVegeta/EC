class ResponseJson::ChatMember
  class << self
    def structure
      {
        uid: nil,
        #  -String
        name: nil,
        #  -String
        picture: nil,
        #  -String
        create_time: nil,
        #  -Long
      }
    end
  end
end
