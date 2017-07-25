class Ajax::Auth::VerificationController < ApplicationController
  include WardenHelper
  include RespondHelper

  # POST /ajax/email_verify
  def email
    @user = ::Auth::Verification::Email.new(email_params, browser_info)
    success = @user.request

    warden_set_user @user.warden_session if success
    update_name if success && !!current_user # nickname update

    respond success, @user
  end

  # POST /ajax/email_verify_resend
  def email_resend
    @user = ::Auth::Verification::EmailResend.new(email_resend_params)
    success = @user.request
    respond success, @user
  end


  # POST /ajax/phone_verify
  def phone
    @user = ::Auth::Verification::Phone.new(phone_params, browser_info)
    success = @user.request

    warden_set_user @user.warden_session if success
    update_name if success && !!current_user # nickname update

    respond success, @user
  end

  # POST /ajax/phone_verify_resend
  def phone_resend
    @user = ::Auth::Verification::PhoneResend.new(phone_resend_params)
    success = @user.request
    respond success, @user
  end


  protected
  def email_params
    params.permit(:email, :verifycode, :password, :name)
  end

  def email_resend_params
    params.permit(:email)
  end

  def phone_params
    params.permit(:phone, :sms, :password, :name)
  end

  def phone_resend_params
    params.permit(:phone)
  end

  def username_params
    params.permit(:name).merge(current_uid_params)
  end

  def update_name
    return if username_params[:name].blank?
    begin
      @userprofile = ::Api::Userprofile::Save.new(username_params, current_apitoken)
      @userprofile.request
    rescue Exception => e
      raise e.inspect
    end
  end
end
