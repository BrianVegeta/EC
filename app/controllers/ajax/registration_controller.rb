class Ajax::RegistrationController < ApplicationController
  include WardenHelper
  prepend_before_action :prepare_browser_info, only: [:verify_by_email, :verify_by_phone]
  protect_from_forgery

  # Email 註冊
  def create_by_email
    user = User.new(email_regist_params)
    response = user.register
    error_code = response['error']['code']

    case error_code
    when ::Response::ErrorCode::NEW_EMAIL_ALREADY_EXIST
      success = false
    else
      success = true
    end
    respond success, ::Response::ErrorCode.localize(error_code)
  end

  # Phone 註冊
  def create_by_phone
    user = User.new(phone_regist_params)
    response = user.register
    error_code = response['error']['code']

    case error_code
    when ::Response::ErrorCode::NEW_MOBILE_ALREADY_EXIST
      success = false
    else
      success = true
    end
    respond success, ::Response::ErrorCode.localize(error_code)
  end

  # 驗證 Email
  def verify_by_email
    @user = User.new(email_verify_params)
    @user.os_type = @os_type
    @user.device_type = @device_type

    verify_gate
  end

  # 驗證 Phone
  def verify_by_phone
    browser = Browser.new(request.user_agent)
    @user = User.new(phone_verify_params)
    @user.os_type = @os_type
    @user.device_type = @device_type

    verify_gate
  end


  protected
  def respond success, message, status = :ok
    render :json=>{ success: success, message: message }, status: status
  end

  def prepare_browser_info
    browser = Browser.new(request.user_agent)
    @os_type = "#{browser.platform.name}"
    @device_type = "Web Browser: #{browser.name} #{browser.version}"
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

  def verify_gate
    response = @user.verify
    error_code = response['error']['code']
    case error_code
    when ::Response::ErrorCode::VERIFY_CODE_NOT_CORRECT
      success = false
    when ::Response::ErrorCode::USER_NOT_EXIST
      success = false
    when ::Response::ErrorCode::SUCCESS
      user_profile = response['data']['user_profile']

      apitoken = response.headers['apitoken']
      uid = user_profile['uid']
      name = user_profile['name']

      warden_set(uid: uid, name: name, apitoken: apitoken)
      success = true
    else
      success = false
    end
    respond success, ::Response::ErrorCode.localize(error_code)
  end
end
