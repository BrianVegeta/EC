class ResponseJson::Sample
  class << self
    def structure
      {
        comments: [],
        #  -Object [ContractCommentRsp]
        pid: nil,
        #  -Long
        pname: nil,
        #  -String
        pdes: nil,
        #  -String
        top_category: nil,
        #  -String
        category: nil,
        #  -String
        cat_id: nil,
        #  -String
        img1: nil,
        #  -String
        img2: nil,
        #  -String
        img3: nil,
        #  -String
        uid: nil,
        #  -String
        unit: nil,
        #  -Integer
        price: nil,
        #  -Integer
        currency: nil,
        #  -String
        calculate_charge_type: nil,
        #  -String
        #  fix[固定價格] count[次數計價] day[天數計價] month[月數計價]
        leasestart: nil,
        #  -Long
        leaseend: nil,
        #  -Long
        deposit: nil,
        #  -Integer
        send_option: nil,
        #  -String
        return_option: nil,
        #  -String
        return_city: nil,
        #  -String
        return_area: nil,
        #  -String
        return_address: nil,
        #  -String
        assign_address_type: nil,
        #  -String
        assign_city: nil,
        #  -String
        assign_area: nil,
        #  -String
        assign_address: nil,
        #  -String
        advance_reservation_days: nil,
        #  -String
        ship_before_start_days: nil,
        #  -String
        min_lease_days: nil,
        #  -String
        discounts: [],
        #  -Object [ItemDiscountRsp]
        rules: nil,
        #  -Object [String]
        cancel_policys: nil,
        #  -Object [ItemCancelPolicyRsp]
        enable: nil,
        #  -Boolean
        city: nil,
        #  -String
        area: nil,
        #  -String
        tags: [],
        #  -Object [String]
        favorite_count: nil,
        #  -Integer
        overdue_rate: nil,
        #  -Integer
        last_update_time: nil,
        #  -Long
        create_time: nil,
        #  -Long
        
      }
    end
  end
end
