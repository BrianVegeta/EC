class ResponseJson::Contract
  class << self
    def structure
      {
        cid: nil,
        #  -create_time
        cid_no: nil,
        #  -String
        pid: nil,
        #  -Long
        type: nil, 
        #  -String
        #  ITEM SERVICE SPACE
        coupon: [],
        #  -Object
        img1: nil,
        #  -String
        pname: nil,
        #  -String
        pdes: nil,
        #  -String
        overdue_rate: nil,
        #  -Integer
        send_type: nil,
        #  -String
        #  享用人選擇的出貨方式 0:面交 , 1:自行寄送 , 2:7-11
        return_type: nil,
        #  -String
        #  享用人選擇的還貨方式 0:面交 , 1:自行寄送 , 2:7-11
        service_location_type: nil,
        #  -String
        #  服務合約時 , 記錄由誰指定服務地址 0:分享人 1:享用人
        note: nil,
        #  -String
        leasestart: nil,
        #  -Long
        leaseend: nil,
        #  -Long
        paymenttype: nil,
        #  -Integer
        #  4 信用卡 1 ATM
        calculate_charge_type: nil,
        #  -String
        #  fix[固定價格] count[次數計價] day[天數計價] month[月數計價]
        price: nil,
        #  -double
        unit: nil,
        #  -Integer
        deposit: nil,
        #  -Integer
        currency: nil,
        #  -String
        discounts: [],
        #  -Object
        rules: [],
        #  -Object
        cancel_policys: [],
        #  -Object
        owneruid: nil,
        #  -String
        owner_nick_name: nil,
        #  -String
        owner_real_name: nil,
        #  -String
        ownercountryid: nil,
        #  -String
        ownerphone: nil,
        #  -String
        owneremail: nil,
        #  -String
        owner_read: nil,
        #  -Boolean
        owner_receive: nil,
        #  -Boolean
        owner_receive_time: nil,
        #  -Long
        lesseeuid: nil,
        #  -String
        lessee_nick_name: nil,
        #  -String
        lessee_real_name: nil,
        #  -String
        lesseecountryid: nil,
        #  -String
        lesseeemail: nil,
        #  -String
        item_lessee_receive_city: nil,
        #  -String
        item_lessee_receive_area: nil,
        #  -String
        item_lessee_receive_address: nil,
        #  -String
        lessee_read: nil,
        #  -Boolean
        lessee_receive: nil,
        #  -String
        lessee_receive_time: nil,
        #  -Long
        lessee_send_time: nil,
        #  -Long
        service_city: nil,
        #  -String
        service_area: nil,
        #  -String
        service_address: nil,
        #  -String
        space_city: nil,
        #  -String
        space_area: nil,
        #  -String
        space_address: nil,
        #  -String
        contractstage: nil,
        #  -Integer
        ownerlastcheck: nil,
        #  -Integer
        owner_confirm_time: nil,
        #  -Long
        lesseelastcheck: nil,
        #  -Integer
        lessee_confirm_time: nil,
        #  -Long
        ownerscore: nil,
        #  -Float
        owner_comment: nil,
        #  -String
        lesseescore: nil,
        #  -Float
        lessee_comment: nil,
        #  -String
        totalfee: nil,
        #  -Double
        creditcardfee: nil,
        #  -Double
        dragonfee: nil,
        #  -Double
        tax: nil,
        #  -Double
        ownertakenfee: nil,
        #  -Double
        lesseepayfee: nil,
        #  -Double
        shipping_time: nil,
        #  -Long
        finished_time: nil,
        #  -Long
        last_update_time: nil,
        #  -Long
        create_time: nil
        #  -Long
      }
    end
  end
end
