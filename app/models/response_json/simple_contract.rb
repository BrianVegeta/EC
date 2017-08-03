class ResponseJson::SimpleContract
  class << self
    def structure
      {
        cid: nil,
        #  -Long
        pid: nil,
        #  -Long
        type: nil,
        #  -String
        #  ITEM, SERVICE, SPACE
        cid_no: nil,
        #  -String
        name: nil,
        #  -String
        price: nil,
        #  -double
        img1: nil,
        #  -String
        contractstage: nil,
        #  -Integer
        owneruid: nil,
        #  -String
        owner_read: nil,
        #  -Boolean
        lesseeuid: nil,
        #  -String
        lessee_read: nil,
        #  -Boolean
        last_update_time: nil,
        #  -Long
        create_time: nil,
        #  -Long
      }
    end
  end
end
