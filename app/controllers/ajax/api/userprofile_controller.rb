class Ajax::Api::UserprofileController < ApplicationController
  include WardenHelper
  
  ###################### ACTION ##################################
  
  # 更新個人資訊 
  def save
    obj = ::Api::Userprofile::Save.new user_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  #取回個人資訊
  def get
    obj = ::Api::Userprofile::Get.new current_uid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 搜尋個人帳戶
  def search
    obj = ::Api::Userprofile::Search.new search_params
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 取回使用者公開資訊
  def user_general_info
    obj = ::Api::Userprofile::UserGeneralInfo.new show_item_params
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 更新手機
  def update_phone
    respond success, obj.error_message, obj.response_data
  end
  
  # 取得更新手機驗證碼
  def get_phone_verify_code
    obj = ::Api::Userprofile::GetPhoneVerifyCode.new update_phone_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 更新信箱
  def update_email
    obj = ::Api::Userprofile::UpdateEmail.new verify_email_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 取得更新信箱驗證碼
  def get_email_verify_code
    obj = ::Api::Userprofile::GetEmailVerifyCode.new update_email_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 綁定FACEBOOK
  def set_facebook
    obj = ::Api::Userprofile::SetFacebook.new facebook_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 解除FACEBOOK綁定
  def facebook_unbind
    obj = ::Api::Userprofile::Get.FacebookUnbind.new facebook_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 同步FACEBOOK名稱
  def fb_user_update_name
    obj = ::Api::Userprofile::FbUserUpdateName.new fb_user_update_name_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  
  # 檢查密碼是否有設定  
  def is_pwd_exist
    obj = ::Api::Userprofile::IsPwdExist.new current_uid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  #檢查密碼是否正確
  def checkpwd
    obj = ::Api::Userprofile::CheckPwd.new password_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 更新密碼
  def update_password
    obj = ::Api::Userprofile::UpdatePassword.new update_password_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 建立密碼
  def create_password
    obj = ::Api::Userprofile::CreatePassword.new password_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  # 加入追中
  def track
    obj = ::Api::Userprofile::Track.new track_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 取消追中
  def untrack
    obj = ::Api::Userprofile::Untrack.new track_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 是否已追中
  def is_tracked
    obj = ::Api::Userprofile::IsTracked.new track_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 取回追中數量
  def track_count
    obj = ::Api::Userprofile::TrackCount.new current_uid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 分享人(賣家)的評價留言
  def owner_comments
    obj = ::Api::Userprofile::OwnerComments.new comments_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
 
  # 享用人(買家)的評價留言
  def lessee_comments
    obj = ::Api::Userprofile::LesseeComments.new comments_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 取回銀行資料
  def bank_info
    obj = ::Api::Userprofile::BankInfo.new current_uid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 更新銀行資料
  def bank_info_update
    obj = ::Api::Userprofile::BankInfoUpdate.new bank_info_update_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 銀行資料是否齊全
  def bank_info_ready
    obj = ::Api::Userprofile::BankInfoReady.new current_uid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end

  # 設定自動出款
  def bank_info_wire_out
    obj = ::Api::Userprofile::BankInfoWireOut.new set_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  # 要求出款
  def bank_info_request_out
    obj = ::Api::Userprofile::BankInfoRequestOut.new set_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
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
    params.permit(:isShowItem).merge(current_uid_params)
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
  
end