class Ajax::SessionsController < ApplicationController
  include WardenHelper
  prepend_before_action :prepare_browser_info
  skip_before_action :verify_authenticity_token

  # POST /ajax/email_login.json
  def create_by_email
    @user = User::SessionsEmail.new(params_email)
    process_login
  end

  # POST /ajax/phone_login.json
  def create_by_phone
    @user = User::SessionsMobile.new(params_phone)
    process_login
  end

  def destroy
    warden.logout(:user)
    respond true, '已成功登出'
  end

  protected
  def params_email
    params.permit(:email, :password)
  end

  def params_phone
    params.permit(:phone, :password)
  end

  def process_login
    @user.os_type = @os_type
    @user.device_type = @device_type
    success = @user.login
    if success
      warden.set_user(@user.warden_session, scope: :user)
    end
    respond success, @user.error_message
  end
end
