class ResponseJson::Notify
  class << self
    def structure
      {
        is_public: nil,
        #  -Boolean
        id: nil,
        #  -Long
        type: nil,
        #  -int
        content: nil,
        #  -content
        create_time: nil,
        #  -Long
      }
    end
  end
end
