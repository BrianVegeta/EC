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
    @user = ::Session::LoginFacebook.new(params_facebook, browser_info)
    success = @user.request

    # render json: @user.response_data and return
    if success
      warden_set_user(@user.warden_session)
      respond success, @user and return
    end

    @new_user = ::Registration::Facebook.new(params_facebook, browser_info)
    new_user_success = @new_user.request

    if new_user_success
      begin
        uid = @new_user.warden_session['uid']
        apitoken = @new_user.warden_session['apitoken']

        @avatar = Images::Avatar.new(uid: uid, image_from_url: params[:avatar_url])
        @avatar.save

        @new_user.picture = @avatar.photo.url
        @userprofile = ::Api::Userprofile::Save.new({ uid: uid, picture: @new_user.picture }, apitoken)
        @userprofile.request

        @new_user.response_data['user_profile'].merge!({ picture: @new_user.picture })

        warden_set_user(@new_user.warden_session)
      rescue

      end
    end

    respond new_user_success, @new_user
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
