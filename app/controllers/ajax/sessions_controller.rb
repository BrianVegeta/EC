class Ajax::SessionsController < ApplicationController
  include WardenHelper
  include RespondHelper
  prepend_before_action :prepare_browser_info

  # POST /ajax/email_login.json
  def create_by_email
    @user = ::User::SessionsEmail.new(params_email)
    process_login
  end

  # POST /ajax/phone_login.json
  def create_by_phone
    @user = ::User::SessionsMobile.new(params_phone)
    process_login
  end

  def create_by_facebook
    @user = ::User::FacebookSession.new(params_facebook)
    @user.os_type = @os_type
    @user.device_type = @device_type
    success = @user.request
    unless success
      @user = ::User::FacebookRegistration.new(params_facebook)
      @user.os_type = @os_type
      @user.device_type = @device_type
      success = @user.request
    end
    if success
      warden_set_user(@user.warden_session)
    end
    respond success, @user
  end

  def destroy
    resource = ::Session::Logout.new current_uid_params, current_apitoken
    success = resource.request

    warden.logout(:user)

    respond success, resource
  end

  protected
  def params_email
    params.permit(:email, :password)
  end

  def params_phone
    params.permit(:phone, :password)
  end

  def params_facebook
    params.permit(:access_token, :fb_id)
  end

  def process_login
    @user.os_type = @os_type
    @user.device_type = @device_type
    success = @user.login
    if success
      warden.set_user(@user.warden_session, scope: :user)
    end
    respond success, @user
  end
end
