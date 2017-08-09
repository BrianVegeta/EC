class Ajax::Api::ItemController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################
  # 新增物品
  def item_add
    obj = ::Api::Item::ItemAdd.new item_params, current_apitoken
    success = obj.request
    if success
      obj.response_data = reverse_merge(obj.response_data, ResponseJson::Pid.structure)
    end
    respond success, obj
  end

  # 更新物品
  def item_update
    obj = ::Api::Item::ItemUpdate.new item_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 新增服務
  def service_add
    obj = ::Api::Item::ServiceAdd.new service_params, current_apitoken
    success = obj.request
    if success
      obj.response_data = reverse_merge(obj.response_data, ResponseJson::Pid.structure)
    end
    respond success, obj
  end

  # 更新服務
  def service_update
    obj = ::Api::Item::ServiceUpdate.new service_update_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 新增空間
  def space_add
    obj = ::Api::Item::SpaceAdd.new space_params, current_apitoken
    success = obj.request
    if success
      obj.response_data = reverse_merge(obj.response_data, ResponseJson::Pid.structure)
    end
    respond success, obj
  end

  # 更新空間
  def space_update
    obj = ::Api::Item::SpaceUpdate.new space_update_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # ID取回商品資料
  def get_item
    obj = ::Api::Item::GetItem.new pid_params
    success = obj.request
    if success
      obj.response_data = parse_item_rsp(obj.response_data)
    end
    respond success, obj
  end

  # 取回使用者的商品列表
  def get_item_by_user
    obj = ::Api::Item::GetItemByUser.new get_item_by_user_params
    success = obj.request
    obj.response_data = map_json_array obj.response_data, ResponseJson::SimpleItem.structure
    #if obj.response_data.nil?
    #   obj.response_data = []
    #else
    #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::SimpleItem.structure) }
    #end
    respond success, obj
  end

  # 商品名稱取回商品列表
  def get_item_by_name
    obj = ::Api::Item::GetItemByName.new get_item_by_name_params
    success = obj.request
    obj.response_data = map_json_array obj.response_data, ResponseJson::SimpleItem.structure
    #if obj.response_data.nil?
    #   obj.response_data = []
    #else
    #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::SimpleItem.structure) }
    #end
    respond success, obj
  end

  # 篩選商品列表
  def search_item_list
    obj = ::Api::Item::SearchItemList.new search_item_params
    success = obj.request
    obj.response_data = map_json_array obj.response_data, ResponseJson::SimpleItem.structure
    #if obj.response_data.nil?
    #   obj.response_data = []
    #else
    #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::SimpleItem.structure) }
    #end
    respond success, obj
  end

  # 紀錄已讀商品
  def view_item
    obj = ::Api::Item::ViewItem.new pid_params
    success = obj.request
    if success
       obj.response_data = parse_item_rsp(obj.response_data)
    end
    respond success, obj
  end

  # 移除商品
  def remove_items
    obj = ::Api::Item::RemoveItems.new remove_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 相關商品
  def relative_item
    obj = ::Api::Item::RelativeItem.new relative_item_params
    success = obj.request
    obj.response_data = map_json_array obj.response_data, ResponseJson::RelativeItem.structure
    #if obj.response_data.nil?
    #   obj.response_data = []
    #else
    #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::RelativeItem.structure) }
    #end
    respond success, obj
  end

  # 投訴商品
  def report
    obj = ::Api::Item::Report.new report_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 取回商品類型
  def category_list
    obj = ::Api::Item::CategoryList.new
    success = obj.request
    respond success, obj
  end

  def message
    obj = ::Api::Item::Message.new get_message_params
    success = obj.request
    obj.response_data = map_json_array obj.response_data, ResponseJson::ItemMessage.structure
    #if obj.response_data.nil?
    #   obj.response_data = []
    #else
    #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::ItemMessage.structure) }
    #end
    respond success, obj
  end

  def message_add
    obj = ::Api::Item::MessageAdd.new add_message_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  ###################### FUNCTION ################################
  private

  def parse_item_rsp(response_data)
     response_data = reverse_merge(response_data, ResponseJson::Item.structure)
     response_data['comments'] = map_json_array response_data['comments'], ResponseJson::ContractComment.structure
     response_data['discounts'] = map_json_array response_data['discounts'], ResponseJson::ItemDiscount.structure
     response_data['cancel_policys'] = map_json_array response_data['cancel_policys'], ResponseJson::ItemCancelPolicy.structure
     return response_data
  end

  ###################### PARAMS ##################################
  protected
  def item_params
    # pname : String => 商品名稱
    # img1 : String => 商品圖1 (首頁)
    # img2 : String => 商品圖2
    # img3 : String => 商品圖3
    # pdes : String => 介紹

    # cat_id : String => 商品類型
    # city : String => 提供需求的城市
    # area : String => 提供需求的區域
    # unit : int => 最大數量
    # price : int => 單件價格
    # currency : String => NTD

    # return_option : String => 0 : 面交 , 1 : 自行寄送 , 2 : 7-11 可複選但不可重複
    # return_city : String => 歸還城市
    # return_area : String => 歸還地區
    # return_address : String => 歸還地址

    # overdue_rate : int => 逾期金 每天罰%數 0~100
    # deposit : int => 押金
    # ship_before_start_days : int => 最低出貨時間  0~99
    # min_lease_days : int => 最低租期時間 0~999

    # tag1 : String => 標籤1 不可包還#
    # tag2 : String => 標籤2 不可包還#
    # tag3 : String => 標籤3 不可包還#

    # discounts : List<Object> => 折扣列表  example [{"type": "x", "param": "N", "discount": "z"},....]
    # - x = GREATER_OR_EQUAL_TO_N_DAY[天數特價] ,GREATER_OR_EQUAL_TO_N_MONTH[月特價] ,GREATER_OR_EQUAL_TO_N_COUNT[數量特價], FIX[馬上特價]
    # - N = x的N值
    # - z = 符合條件後，新的價格
    # rules : List<String> => 分享人守則

    params.permit(:pname, :img1, :img2, :img2, :pdes,
      :cat_id, :city, :area, :unit, :price, :currency,
      :return_option, :return_city, :return_area, :return_address,
      :overdue_rate, :deposit, :ship_before_start_days, :min_lease_days,
      :tag1, :tag2, :tag3,
      rules: [], discounts: []).merge(current_uid_params)

  end

  def item_update_params
    # pid : Long => 商品ID
    params.permit(:pid).merge(item_params)
  end

  def service_params
    # pname : String => 商品名稱
    # img1 : String => 商品圖1 (首頁)
    # img2 : String => 商品圖2
    # img3 : String => 商品圖3
    # pdes : String => 介紹

    # cat_id : String => 商品類型
    # city : String => 提供需求的城市
    # area : String => 提供需求的區域
    # unit : int => 最大數量  fix 時 , 為必填
    # price : int => 單件價格

    # currency : String => NTD
    # deposit : int => 押金
    # advance_reservation_days : int => 提前預約天數
    # min_lease_days : int => 最低租期時間 0~999

    # tag1 : String => 標籤1 不可包還#
    # tag2 : String => 標籤2 不可包還#
    # tag3 : String => 標籤3 不可包還#

    # assign_address_type : String => 0 : 分享人設定服務地點  , 1 : 享用人設定服務地點  可多選但不可重複
    # assign_city : String => 指定城市
    # assign_area : String => 指定地區
    # assign_address : String => 指定地址

    # calculate_charge_type String => fix[一次價格] count[人量計價] day[天數計價 ]
    # start_date : Long => 指定服務開始時間
    # end_date : Long =>  指定服務結束時間

    # discounts : List<Object> => 折扣列表  example [{"type": "x", "param": "N", "discount": "z"},....]
    # - x = GREATER_OR_EQUAL_TO_N_DAY[天數特價] ,GREATER_OR_EQUAL_TO_N_MONTH[月特價] ,GREATER_OR_EQUAL_TO_N_COUNT[數量特價], FIX[馬上特價]
    # - N = x的N值
    # - z = 符合條件後，新的價格
    # rules : List<String> => 分享人守則

    params.permit(:pname, :img1, :img2, :img2, :pdes,
      :cat_id, :city, :area, :unit, :price,
      :currency, :deposit, :advance_reservation_days, :min_lease_days,
      :tag1, :tag2, :tag3,
      :assign_address_type, :assign_city, :assign_area, :assign_address,
      :calculate_charge_type, :start_date, :end_date,
      rules: [], discounts: []).merge(current_uid_params)

  end

  def service_update_params
    # pid : Long => 商品ID
    params.permit(:pid).merge(service_params)
  end

  def space_params
    # pname : String => 商品名稱
    # img1 : String => 商品圖1 (首頁)
    # img2 : String => 商品圖2
    # img3 : String => 商品圖3
    # pdes : String => 介紹

    # cat_id : String => 商品類型
    # city : String => 提供需求的城市
    # area : String => 提供需求的區域
    # unit : int => 最大數量
    # price : int => 單件價格

    # currency : String => NTD
    # deposit : int => 押金
    # advance_reservation_days : int => 提前預約天數
    # min_lease_days : int => 最低租期時間 0~999

    # tag1 : String => 標籤1 不可包還#
    # tag2 : String => 標籤2 不可包還#
    # tag3 : String => 標籤3 不可包還#
    # assign_address : String => 指定地址
    # calculate_charge_type : String => day[天數計價 ] month[月數計]

    # discounts : List<Object> => 折扣列表  example [{"type": "x", "param": "N", "discount": "z"},....]
    # - x = GREATER_OR_EQUAL_TO_N_DAY[天數特價] ,GREATER_OR_EQUAL_TO_N_MONTH[月特價] ,GREATER_OR_EQUAL_TO_N_COUNT[數量特價], FIX[馬上特價]
    # - N = x的N值
    # - z = 符合條件後，新的價格
    # rules : List<String> => 分享人守則

    params.permit(:pname, :img1, :img2, :img2, :pdes,
       :cat_id, :city, :area, :unit, :price,
       :currency, :deposit, :advance_reservation_days, :min_lease_days,
       :tag1, :tag2, :tag3, :assign_address, :calculate_charge_type,
       rules: [], discounts: []).merge(current_uid_params)

   end

   def space_update_params
     # pid : Long => 商品ID
     params.permit(:pid).merge(space_params)
   end

   def pid_params
     # pid : Long => 商品ID
     params.permit(:pid)
   end

   def search_item_params
     # my_uid -string
     # target_uid -string
     # category_id -string
     # price_max -int
     # price_min -int
     # transactiontype -int 0 : 面交 1 : 自行寄送
     # send_option -string 0 : 面交 1 : 自行寄送
     # locations -object array
     #    city -string
     #    area -string
     # sort -object
     #    column -string price / time / view  -desc 依照價格 / 建立時間 / 人氣排序
     #    type -string asc/ desc
     # index -int -not null
     # size -int -not null
     params.permit(
      :my_uid, :target_uid, :category_id,
      :price_max, :price_min,
      :transactiontype, :send_option,
      {locations: [:city, :area]},
      sort: [:column, :type],
    ).merge(paging_params)

   end

   def get_item_by_name_params
     # name : String 收尋類似商品名字
     params.permit(:name).merge(paging_params)
   end

   def get_item_by_user_params
     # uid : 對方UID
     params.permit(:uid)
   end

   def remove_params
     # pid : List<long> => 要移除的商品
     params.permit(pid: []).merge(current_uid_params)
   end

   def relative_item_params
     # catId : String => 類型代號
     # count :　Int => 數量
     # pid : long => 商品ID (避免API搜尋到相同商品)
     params.permit(:catId, :count, :pid).merge(current_uid_params)
   end

   def report_params
     # pid : long => 商品ID
     # reason : String => 原因
     params.permit(:pid, :reason).merge(current_uid_params)
   end

   def get_message_params
     # pid : long => 商品ID
     params.permit(:pid ).merge(paging_params)
   end

   def add_message_params
     # pid : long => 商品ID
     # message : String => 內文
     # target_uid : String => 回覆使用者
     params.permit(:pid, :message, :target_uid).merge(current_uid_params)
   end
end
