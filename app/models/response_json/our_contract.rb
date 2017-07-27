class ResponseJson::OurContract
  class << self
    def structure
      {
        cid_no: nil,
        #  -String
        item_img: nil,
        #  -String
        item_name: nil,
        #  -String
        unit: nil,
        #  -Integer
        currency: nil,
        #  -String
        totalfee: nil,
        #  -Integer
        owner_uid: nil,
        #  -String
        owner_nick_name: nil,
        #  -String
        lessee_uid: nil,
        #  -String
        lessee_nick_name: nil,
        #  -String
        lessee_img: nil,
        #  -String
        stage: nil,
        #  -Integer
        lease_start: nil,
        #  -Long
        lease_end: nil,
        #  -Long
        shipping_time: nil,
        #  -Long
        create_time: nil,
        #  -Long
      }
    end
  end
end
