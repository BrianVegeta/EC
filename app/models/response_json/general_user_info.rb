class ResponseJson::General_user_info
  class << self
    def structure
      {
        user_profile: nil,
        #  -Objeat UserRsp
        items: [],
        #  -Object [SimpleItemRsp]
      }
    end
  end
end
