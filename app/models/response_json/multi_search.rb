class ResponseJson::MultiSearch
  class << self
    def structure
      {
        items: [],
        #  -String
        users: [],
        #  -String
        wishs: [],
        #  -String
      }
    end
  end
end
