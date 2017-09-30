class ResponseJson::Iot::Login
  class << self
    def structure
      {
        uid: nil,
        #  -string
        name: nil,
        #  -string
        token: nil,
        #  -string
      }
    end
  end
end
