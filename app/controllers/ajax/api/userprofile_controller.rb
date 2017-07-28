class Ajax::Api::UserprofileController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################

  # 更新個人資訊
  def save
    obj = ::Api::Userprofile::Save.new user_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  #取回個人資訊
  def get
    obj = ::Api::Userprofile::Get.new current_uid_params, current_apitoken
    success = obj.request
    if success
       obj.response_data = reverse_merge(obj.response_data, ResponseJson::UserProfile.structure)
    end
    respond success, obj
  end

  # 搜尋個人帳戶
  def search
    obj = ::Api::Userprofile::Search.new search_params
    success = obj.request
    if obj.response_data.nil?
       obj.response_data = []
    else
      obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::UserProfile.structure) }
    end
    respond success, obj
  end

  # 取回使用者公開資訊
  def user_general_info
    obj = ::Api::Userprofile::UserGeneralInfo.new show_item_params
    success = obj.request

    
    if success
      obj.response_data['user_profile'] = reverse_merge(obj.response_data['user_profile'], ResponseJson::UserProfile.structure)
      if (obj.response_data['items'].nil?) 
        obj.response_data['items'] = [];
      else 
        obj.response_data['items'].map { |item, index| reverse_merge(item, ResponseJson::SimpleItem.structure) }
      end
    end
    respond success, obj
  end

  # 更新手機
  # post /ajax/user/update/phone/confirm
  def update_phone
    respond true, OpenStruct.new({ response_data: nil })
    return

    obj = ::Api::Userprofile::UpdatePhone.new verify_phone_params, current_apitoken
    respond success, obj
  end

  # 取得更新手機驗證碼
  # post /ajax/user/update/phone
  def get_phone_verify_code
    respond true, OpenStruct.new({ response_data: nil })
    return

    obj = ::Api::Userprofile::GetPhoneVerifyCode.new update_phone_params, current_apitoken
    success = obj.request

    respond success, obj
  end

  # 更新信箱
  # post /ajax/user/update/email/confirm
  def update_email
    obj = ::Api::Userprofile::UpdateEmail.new verify_email_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 取得更新信箱驗證碼
  # post /ajax/user/update/email
  def get_email_verify_code
    obj = ::Api::Userprofile::GetEmailVerifyCode.new update_email_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 綁定FACEBOOK
  def set_facebook
    obj = ::Api::Userprofile::SetFacebook.new facebook_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 解除FACEBOOK綁定
  def facebook_unbind
    obj = ::Api::Userprofile::Get.FacebookUnbind.new facebook_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 同步FACEBOOK名稱
  def fb_user_update_name
    obj = ::Api::Userprofile::FbUserUpdateName.new fb_user_update_name_params, current_apitoken
    success = obj.request
    respond success, obj
  end


  # 檢查密碼是否有設定
  # get '/ajax/password/exist'
  def is_pwd_exist

    obj = ::Api::Userprofile::IsPwdExist.new current_uid_params, current_apitoken
    success = obj.request

    respond success, obj
  end

  #檢查密碼是否正確 #in use
  # post '/ajax/password/check'
  def checkpwd

    obj = ::Api::Userprofile::CheckPwd.new password_params, current_apitoken
    success = obj.request

    respond success, obj
  end

  # 更新密碼
  def update_password
    obj = ::Api::Userprofile::UpdatePassword.new update_password_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 建立密碼
  # post '/ajax/password/create'
  def create_password

    obj = ::Api::Userprofile::CreatePassword.new password_params, current_apitoken
    success = obj.request

    respond success, obj
  end

  # 加入追中
  def track
    obj = ::Api::Userprofile::Track.new track_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 取消追中
  def untrack
    obj = ::Api::Userprofile::Untrack.new track_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 是否已追中
  def is_tracked
    obj = ::Api::Userprofile::IsTracked.new track_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 取得追蹤人
  def get_track_user
    obj = ::Api::Userprofile::GetTrackUser.new track_user_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
        obj.response_data = []
    else
        obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::TrackUser.structure) }
    end
    respond success, obj
  end
  
  # 取回追中數量
  def track_count
    obj = ::Api::Userprofile::TrackCount.new current_uid_params, current_apitoken
    success = obj.request
    if success
      obj.response_data = reverse_merge(obj.response_data, ResponseJson::TrackUserCount.structure)
    end
    respond success, obj
  end

  # 分享人(賣家)的評價留言
  def owner_comments
    obj = ::Api::Userprofile::OwnerComments.new comments_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
        obj.response_data = []
    else
         obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::ContractComment.structure) }
    end
    respond success, obj
  end

  # 享用人(買家)的評價留言
  def lessee_comments
    obj = ::Api::Userprofile::LesseeComments.new comments_params, current_apitoken
    success = obj.request
    if obj.response_data.nil?
      obj.response_data = []
    else
      obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::ContractComment.structure) }
    end
    respond success, obj
  end

  # 取回銀行資料
  # POST /ajax/bank/bankacc
  def bank_info
    # 請使用cipher decrypt data
    obj = ::Api::Userprofile::BankInfo.new current_uid_params, current_apitoken
    success = obj.request

    uid = current_uid_params['uid']

    if obj.response_data.present?
      decrypted = ::Cypher.new.decrypt(obj.response_data['key'], uid)
      obj.response_data = JSON.parse(decrypted).map {|k, v| {
        k => (v == 'NULL') ? '' : v
      }}.reduce(:merge)
    end

    respond success, obj
  end

  # 更新銀行資料
  def bank_info_update
    # requier password

    # 請使用cipher encript
    obj = ::Api::Userprofile::BankInfoUpdate.new bank_info_update_params, current_apitoken
    success = obj.request
    respond success, obj
  end


  # 銀行資料是否齊全
  # GET /ajax/bank/bankacc/ready.json
  def bank_info_ready
    obj = ::Api::Userprofile::BankInfoReady.new current_uid_params, current_apitoken
    success = obj.request

    respond success, obj
  end

  # 設定自動出款
  def bank_info_auto_wire
    obj = ::Api::Userprofile::BankInfoAutoWire.new set_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  # 要求出款
  def bank_info_request_out
    obj = ::Api::Userprofile::BankInfoRequestOut.new set_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  ###################### PARAMS ##################################
  protected

  def user_params
    # name : String => 暱稱
    # picture : String => 頭像
    # autobiography : String => 簡介
    # website : String => 網頁
    # city : String => 城市
    # area : String => 地區
    # occupation : String => 職業
    # bkg_img : String => 背景圖片

    params.permit(:name, :picture, :autobiography, :website, :city, :area, :occupation, :bkg_img).merge(current_uid_params)
  end

  def show_item_params
    # isShowItem : bool => true 帶回商品列表  false 不取商品列表
    # uid : String => 對方UID
    params.permit(:isShowItem, :uid)
  end

  def search_params
    # name : String => 搜尋名字
    params.permit(:name).merge(paging_params)
  end

  def update_phone_params
    # new_mobile : String => 電話
    # password : String => 密碼
    params.permit(:new_mobile, :password).merge(current_uid_params)
  end

  def verify_phone_params
    # sms : String => 驗證碼
    params.permit(:sms).merge(current_uid_params)
  end

  def update_email_params
    # new_email : String => 信箱
    # password : String => 密碼
    params.permit(:new_email, :password).merge(current_uid_params)
  end

  def verify_email_params
    # verifycode : String => 驗證碼
    params.permit(:verifycode).merge(current_uid_params)
  end

  def facebook_params
    # fb_id : String => facebook id
    # access_token : String => facebook token
    params.permit(:fb_id, :access_token).merge(current_uid_params)
  end

  def fb_user_update_name_params
    # fb_id : String => facebookd id
    # name : String => 更換名稱
    params.permit(:fb_id, :name).merge(current_uid_params)
  end

  def password_params
    # password : String => 使用者輸入密碼
    params.permit(:password).merge(current_uid_params)
  end

  def update_password_params
    # new_password : String => 新密碼
    # old_password : String => 舊密碼
    params.permit(:new_password, :old_password).merge(current_uid_params)
  end

  def track_params
    # target_uid : String => 追中的UID
    params.permit(:target_uid).merge(current_uid_params)
  end

  def comments_params
    params.merge(current_uid_params).merge(paging_params)
  end

  def bank_info_update_params
    # value => String => 加密後資料
    # device_type : Int => 3(固定)
    params.permit(:value, :device_type).merge(current_uid_params)
  end

  def set_params
    #isEnable : bool => true or false
    params.permit(:isEnable).merge(current_uid_params)
  end
  
  def track_user_params
    #type : String => me_track track_me
    #target_uid : String => uid
    params.permit(:type, :target_uid).merge(current_uid_params).merge(paging_params)
  end

end
