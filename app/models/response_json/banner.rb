class ResponseJson::Banner
  class << self
    def structure
      {
        id: nil,
        #  -long
        name: nil,
        #  -string
        url: nil,
        #  -string
        sort: nil,
        #  -Integer
        type: nil,
        #  -string
        action: nil,
        # -Integer
        arg: nil,
        # -string
        created_at: nil,
        # -long (millisecond)
        updated_at: nil,
        # -long (millisecond)
      }
    end
  end
end
