class ResponseJson::UserReport
  class << self
    def structure
      {
        img1: nil,
        # string
        img2: nil,
        # string
        img3: nil,
        # string
        u_no: nil,
        # string
        suer_name: nil,
        # string
        # desc 申訴人暱稱
        suer_uid: nil,
        # string
        # desc 申訴人UID
        defender_name: nil,
        # string
        #  desc 被申訴人暱稱
        defender_uid: nil,
        # string
        # desc 被申訴人UID
        type: nil,
        # int
        # desc 申訴類型
        sue_reason: nil,
        # string
        # desc 申訴原因
        status: nil,
        # int
        # desc:申訴狀態
        # 1 : 申訴中
        # 2 : 申訴中
        # 3 : 申訴文件已收到，截止日延長六個月
        # 4 : 申訴中
        # 5 : 判決書已收到
        # 6 : 判決書已收到
        # 7 : 判決書已收到
        # 8 : 申訴完成
        case_end: nil,
        # long
        # desc:合約截止時間
        create_time: nil,
        # long
        # desc 建檔時間"
      }
    end
  end
end
