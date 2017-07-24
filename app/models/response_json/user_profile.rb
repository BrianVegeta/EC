class ResponseJson::UserProfile
  class << self
    def structure
      {
        uid: nil,
        #  -string
        name: nil,
        #  -string
        email: nil,
        #  -string
        phone: nil,
        #  -string
        fb_id: nil,
        #  -string
        picture: nil,
        # -string
        autobiography: nil,
        # -string
        website: nil,
        # -string
        city: nil,
        # -string
        area: nil,
        # -string
        credit: nil,
        # -double
        owner_credit: nil
        #  -double
        #  -desc : 身為分享人所得到的評價
        lessee_credit: nil
        #  -double
        #  -desc : 身為享用人所得到的評價
        occupation: nil,
        #  -string
        #  -desc:職業
        bkg_img: nil,
        #  -string
        #  -desc:背景圖片
        create_time: nil,
        #  -long
        #  -創建帳號
      }
    end
  end
end
