class Ajax::Auth::IndexController < ApplicationController
  include WardenHelper
  include RespondHelper

  def get_current_user
    respond user_signed_in?, '', current_user
  end

  def get_user_info
    @user = UserInfo.new(current_user.slice('uid'))
    success = @user.request
    respond success, '', @user.response_data
  end

  def notifications

  end

  def sync
    unless user_signed_in?
      render json: {
        success: false,
      } and return
    end

    resource = ::Api::Userprofile::Get.new current_uid_params, current_apitoken
    success = resource.request

    if success
      warden_set_user current_user.merge(resource.response_data)
    end

    respond success, resource
  end
end
