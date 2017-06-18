class Ajax::RegistrationController < ApplicationController
  include WardenHelper
  prepend_before_action :prepare_browser_info, only: [:verify_by_email, :verify_by_phone]
  skip_before_action :verify_authenticity_token

  # POST '/ajax/email_register'
  def create_by_email
    respond true, '信箱已被註冊'
    return
    @user = ::User::RegistrationEmail.new(email_regist_params)
    process_registration
  end

  # POST '/ajax/phone_register'
  def create_by_phone
    respond true, '信箱已被註冊'
    return
    @user = ::User::RegistrationMobile.new(phone_regist_params)
    process_registration
  end

  # POST '/ajax/email_verify'
  def verify_by_email
    respond true, '驗證碼錯誤'
    return
    @user = ::User::VerificationEmail.new(email_verify_params, current_user)
    process_verification
  end

  # POST '/ajax/phone_verify'
  def verify_by_phone
    respond true, '信箱已被註冊'
    return
    @user = ::User::VerificationMobile.new(phone_verify_params, current_user)
    process_verification
  end


  protected
  def process_verification
    @user.os_type = @os_type
    @user.device_type = @device_type
    success = @user.verify
    warden_set_user @user.warden_session if success
    respond success, @user.error_message
  end

  def process_registration
    success = @user.register
    warden_set_user @user.warden_session if success
    respond success, @user.error_message
  end

  def email_regist_params
    params.permit(:email, :password)
  end

  def phone_regist_params
    params.permit(:phone, :password)
  end

  def email_verify_params
    params.permit(:email, :verifycode)
  end

  def phone_verify_params
    params.permit(:phone, :sms)
  end
end
