class Ajax::Api::ContractController < ApplicationController
  include WardenHelper
  include RespondHelper  

  ###################### ACTION ##################################

  # 取回行事曆範圍內的合約
  def calendar
    obj = ::Api::Contract::Calendar.new calendar_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
      obj.response_data = []
    else
       obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::Contract.structure) }
    end
    respond success, obj
  end

  # 取消合約
  def cancel
    obj = ::Api::Contract::Cancel.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 取回已完成合約
  def end_contract
    obj = ::Api::Contract::EndContract.new current_uid_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
       obj.response_data = []
    else
        obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::SimpleContract.structure) }
    end
    
    respond success, obj
  end

  # 取回可申訴的合約
  def find_can_report
    obj = ::Api::Contract::FindCanReport.new target_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
      obj.response_data = []
    else
       obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::Contract.structure) }
    end
    respond success, obj
  end

  # 取回自己的合約
  def get_my_contract
    obj = ::Api::Contract::GetMyContracts.new contract_of_me_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
        obj.response_data = []
    else
         obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::MyContract.structure) }
    end
    respond success, obj
  end

  # 聊天室取回雙方的合約
  def get_our_contracts
    obj = ::Api::Contract::GetOurContracts.new target_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
         obj.response_data = []
     else
          obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::OurContract.structure) }
     end
    respond success, obj
  end

  # 取回申訴列表
  def get_report
    obj = ::Api::Contract::GetReport.new current_uid_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
       obj.response_data = nil
    else
       obj.response_data.reverse_merge(obj.response_data, ResponseJson::UserReport.structure)
    end
    respond success, obj
  end

  # 取回單筆合約
  def get
    obj = ::Api::Contract::Get.new cid_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
      obj.response_data = nil
    else
      obj.response_data.reverse_merge(obj.response_data, ResponseJson::Contract.structure)
    end
    respond success, obj
  end

  # 上傳合約出貨或還貨照片
  def image_upload
    obj = ::Api::Contract::ImageUpload.new upload_image_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 建立物品合約
  def item_create
    obj = ::Api::Contract::ItemCreate.new create_item_contract_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 更新商品類型合約
  def item_update
    obj = ::Api::Contract::ItemUpdate.new update_item_contract_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 問API設計師
  def logs
    obj = ::Api::Contract::Logs.new cid_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
         obj.response_data = []
     else
          obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::ContractLog.structure) }
     end
    respond success, obj
  end

  # 設定合約以讀未讀
  def read
    obj = ::Api::Contract::Read.new read_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 收到還貨商品
  def receive_goods
    obj = ::Api::Contract::ReceiveGoods.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 要求合約修改
  def reject
    obj = ::Api::Contract::Reject.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 申訴合約
  def report
    obj = ::Api::Contract::Report.new report_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 還貨商品
  def return_goods
    obj = ::Api::Contract::returnGoods.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 評分合約
  def score
    obj = ::Api::Contract::Score.new score_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 建立服務合約
  def service_create
    obj = ::Api::Contract::ServiceCreate.new create_service_contract_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 結束服務合約
  def service_end
    obj = ::Api::Contract::ServiceEnd.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 更新服務類型合約
  def service_update
    obj = ::Api::Contract::ServiceUpdate.new update_service_contract_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 出貨商品
  def ship_goods
    obj = ::Api::Contract::ShipGoods.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 同意合約
  def sign
    obj = ::Api::Contract::Sign.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 建立空間合約
  def space_create
    obj = ::Api::Contract::SpaceCreate.new create_space_contract_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 結束空間合約
  def space_end
    obj = ::Api::Contract::SpaceEnd.new cid_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 更新空間型合約
  def space_update
    obj = ::Api::Contract::SpaceUpdate.new update_space_contract_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  ###################### PARAMS ##################################
  protected
  def cid_params
    #cid : Long => cid　代號
    params.permit(:cid).merge(current_uid_params);
  end

  def calendar_params
    #start_date : Long => 搜尋開始時間
    #end_date : Long => 搜尋結束時間
    params.permit(:start_date, :end_date).merge(current_uid_params);
  end

  def target_params
    #target_uid : String => 對方的UID
    params.permit(:target_uid).merge(current_uid_params);
  end

  def upload_image_params
    #type : String => OWNER_SEND, LESSEE_RECEIVE, LESSEE_SEND, OWNER_RECEIVE
    #imgs : List<String> => 圖片URL
    params.permit(:type, imgs: []).merge(cid_params)
  end

  def item_contract_params
     # unit : int => 數量;
     # paymenttype : int => 交易類型  1:ATM 4:信用卡;
     # send_type　: int => 享用人選擇的出貨方式 0:面交 , 1:自行寄送 , 2:7-11
     # send_b_store_id : int => 享用人7-11收貨的店號 當承租人 選擇收貨方式是 2: 7-11 時 須填店號 ,
     # return_type : int => 享用人選擇的還貨方式 0:面交 , 1:自行寄送 , 2:7-11
     # item_lessee_receive_city : String;
     # item_lessee_receive_area : String;
     # lessee_receive_address : String;
     # leasestart : Long => 合約開始時間
     # leaseend : Ｌong =>  合約結束時間
  　 # coupon_no : String => 折價卷的代號
     # note : String => 文字

     params.permit(:unit, :paymenttype, :send_type, :send_b_store_id,
       :return_type, :item_lessee_receive_city, :item_lessee_receive_area,
       :lessee_receive_address, :leasestart, :leaseend, :coupon_no, :note
       ).merge(current_uid_params)

  end

  def create_item_contract_params
    # pid : long => 商品ID
    params.permit(:pid).merge(item_contract_params)
  end

  def update_item_contract_params
    # cid : long => 合約ID
    params.permit(:cid).merge(item_contract_params)
  end

  def service_contract_params
     # unit : int => 數量;
     # paymenttype : int => 交易類型  1:ATM 4:信用卡;
     # service_location_type : String => 服務合約時 , 記錄由誰指定服務地址 0:分享人 1:享用人
     # service_city : String 服務城市
     # service_area : String 服務地區
     # service_address : String 服務地址
     # leasestart : Long => 合約開始時間
     # leaseend : Ｌong =>  合約結束時間
     # coupon_no : String => 折價卷的代號
     # note : String => 文字

     params.permit(:unit, :paymenttype, :service_location_type, :service_city,
       :service_area, :service_address, :leasestart, :leaseend, :coupon_no, :note
       ).merge(current_uid_params)

  end

  def create_service_contract_params
    # pid : long => 商品ID
    params.permit(:pid).merge(service_contract_params)
  end

  def update_service_contract_params
    # cid : long => 合約ID
    params.permit(:cid).merge(service_contract_params)
  end


  def space_contract_params
       # unit : int => 數量;
       # paymenttype : int => 交易類型  1:ATM 4:信用卡;
       # leasestart : Long => 合約開始時間
       # leaseend : Ｌong =>  合約結束時間
      　       # coupon_no : String => 折價卷的代號
       # note : String => 文字

       params.permit(:unit, :paymenttype, :leasestart, :leaseend, :coupon_no, :note
         ).merge(current_uid_params)

  end

  def create_space_contract_params
    # pid : long => 商品ID
    params.permit(:pid).merge(service_contract_params)
  end

  def update_space_contract_params
    # cid : long => 合約ID
    params.permit(:cid).merge(service_contract_params)
  end


  def read_params
    #type : String => ME_READ, HE_UNREAD[]
    params.permit(:type).merge(cid_params)
  end

  def report_params
    # img1 : String => 照片一
    # img2 : String => 照片二：
    # img3 : String => 照片三
    # targetstage　: int => 更新合約狀態
    # reason : String => 原因
    # targetuid　: String => 對方UID
    # type : int => 類型
    params.permit(:img1, :img2, :img3, :targetstage, :reason, :targetuid, :type).merge(cid_params)
  end

  def contract_of_me_params
     #role_type : String =>  BOTH / OWNER / LESSEE
     #type : String => ITEM / SERVICE / SPACE
     params.permit(:role_type, :type).merge(current_uid_params);
  end

  def score_params
    # score : Float => 0.0~5.0
    # comment : String => 留言
    params.permit(:score, :comment).merge(cid_params);
  end
end