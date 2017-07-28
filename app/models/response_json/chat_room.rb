class ResponseJson::ChatRoom
  class << self
    def structure
      {
        room_id: nil,
        #  -String
        room_type: nil,
        #  -String
        #  -CONTRACT, CHAT, GROUP_CHAT
        last_message: nil,
        #  -String
        unread_message_count: nil,
        #  -Integer
        last_message_create_time: nil,
        #  -Long
        members: [],
        #  -Object[ChatMemberRsp]
      }
    end
  end
end
