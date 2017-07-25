class Ajax::Auth::SessionsController < ApplicationController
  include WardenHelper
  include RespondHelper

  # POST /ajax/email_login.json
  def email
    @user = ::Auth::Session::LoginEmail.new(params_email, browser_info)

    success = @user.request
    warden_set_user(@user.warden_session) if success
    respond success, @user
  end

  # POST /ajax/phone_login.json
  def phone
    @user = ::Auth::Session::LoginMobile.new(params_phone, browser_info)

    success = @user.request
    warden_set_user(@user.warden_session) if success
    respond success, @user
  end

  # POST /ajax/facebook_login_callback.json
  def facebook
    @user = ::Auth::Session::LoginFacebook.new(params_facebook, browser_info)
    success = @user.request

    if success
      warden_set_user(@user.warden_session)
      respond success, @user and return
    end

    @new_user = ::Auth::Registration::Facebook.new(params_facebook, browser_info)
    new_user_success = @new_user.request

    if new_user_success
      begin
        uid = @new_user.warden_session['uid']
        apitoken = @new_user.warden_session['apitoken']

        fb_avatar_url = "https://graph.facebook.com/#{params_facebook[:fb_id]}/picture?type=large"
        # params[:avatar_url]
        @avatar = Images::Avatar.new(uid: uid, image_from_url: fb_avatar_url)
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
    resource = ::Auth::Session::Logout.new current_uid_params, current_apitoken
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
end
