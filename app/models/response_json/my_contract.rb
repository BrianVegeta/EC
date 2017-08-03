class ResponseJson::MyContract
  class << self
    def structure
      {
        cid: nil,
        #  -Long
        cid_no: nil,
        #  -String
        pid: nil,
        #  -Long
        type: nil,
        #  -String
        #  ITEM , SERVICE, SPACE
        img1: nil,
        #  -String
        pname: nil,
        #  -String
        pdes: nil,
        #  -String
        leasestart: nil,
        #  -Long
        leaseend: nil,
        #  -Long
        paymenttype: nil,
        #  -Integer
        calculate_charge_type: nil,
        #  -String
        #  fix 固定價格 count 次數計價 day 天數計價 month月數計價
        unit: nil,
        #  -Integer
        deposit: nil,
        #  -Integer
        currency: nil,
        #  -String
        owneruid: nil,
        #  -String
        owner_nick_name: nil,
        #  -String
        owner_img: nil,
        #  -String
        owner_read: nil,
        #  -Boolean
        owner_receive: nil,
        #  -Boolean
        owner_receive_time: nil,
        #  -Long
        ownerscore: nil,
        #  -Float
        owner_comment: nil,
        #  -String
        lesseeuid: nil,
        #  -String
        lessee_nick_name: nil,
        #  -String
        lessee_img: nil,
        #  -String
        lessee_read: nil,
        #  -Boolean
        lessee_receive: nil,
        #  -Boolean
        lessee_receive_time: nil,
        #  -Long
        lessee_send_time: nil,
        #  -Long
        lesseescore: nil,
        #  -Float
        lessee_comment: nil,
        #  -String
        contractstage: nil,
        #  -Integer
        totalfee: nil,
        #  -Double
        lesseepayfee: nil,
        #  -Double
        create_time: nil,
        #  -Long
      }
    end
  end
end
