class Ajax::Auth::RegistrationController < ApplicationController
  include WardenHelper
  include RespondHelper

  # POST /ajax/email_verify
  def email
    @user = ::Verification::Email.new(email_params, browser_info)
    success = @user.request
    warden_set_user @user.warden_session if success
    respond success, @user
  end

  # POST /ajax/phone_verify
  def phone
    @user = ::Verification::Phone.new(phone_params, browser_info)
    success = @user.request
    warden_set_user @user.warden_session if success
    respond success, @user
  end


  protected
  def email_params
    params.permit(:email, :verifycode, :password)
  end

  def phone_params
    params.permit(:phone, :sms, :password)
  end
end
