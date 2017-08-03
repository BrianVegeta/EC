class Ajax::Api::ForgetpasswordController < ApplicationController
  include WardenHelper
  include RespondHelper 
  
  ###################### ACTION ##################################
  
  # 重發驗證碼
  def email_resend_verify
    obj = ::Api::Forgetpassword::EmailResendVerify.new email_params
    success = obj.request
    respond success, obj
  end
  
  # 回傳驗證碼給SERVER
  def mail_get_token
    obj = ::Api::Forgetpassword::MailGetToken.new email_token_params
    success = obj.request
    respond success, obj
  end
  
  # 設定新密碼
  def mail_reset
    obj = ::Api::Forgetpassword::MailReset.new email_reset_params
    success = obj.request
    respond success, obj
  end
  
  # 重發驗證碼
  def mobile_resend_verify
    obj = ::Api::Forgetpassword::MobileResendVerify.new mobile_params
    success = obj.request
    respond success, obj
  end

  # 回傳驗證碼給SERVER  
  def mobile_get_token
    obj = ::Api::Forgetpassword::MobileGetToken.new mobile_token_params
    success = obj.request
    respond success, obj
  end
 
  # 設定新密碼
  def mobile_reset
    obj = ::Api::Forgetpassword::MobileReset.new mobile_reset_params
    success = obj.request
    respond success, obj
  end
  
  ###################### PARAMS ##################################
  protected
 
  def email_params
    # email : String => 信箱
    params.permit(:email);
  end
  
  def email_token_params
    # email : String => 信箱
    # verify_code : String => 驗證碼
    params.permit(:email, :verify_code);
  end
  
  def email_reset_params
    # email : String => 信箱
    # password : String => 新密碼
    # token : String => 臨時Token
    params.permit(:email, :password, :token);
  end

  def mobile_params
    # mobile : String => 手機
    params.permit(:mobile);
  end
  
  def mobile_token_params
    # mobile : String => 手機
    # verify_code : String => 驗證碼
    params.permit(:mobile, :verify_code);
  end
  
  def mobile_reset_params
    # mobile : String => 手機
    # password : String => 新密碼
    # token : String => 臨時Token
    params.permit(:email, :password, :token);
  end
end