class Ajax::Auth::RegistrationController < ApplicationController
  include WardenHelper
  include RespondHelper

  # POST /ajax/email_register
  def email
    @user = ::Registration::Email.new(email_params)
    success = @user.request
    respond success, @user
  end

  # POST /ajax/phone_register
  def phone
    @user = ::Registration::Phone..new(phone_params)
    success = @user.request
    respond success, @user
  end


  protected
  def email_params
    params.permit(:email, :password)
  end

  def phone_params
    params.permit(:phone, :password)
  end
end
