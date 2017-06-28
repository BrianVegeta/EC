class Ajax::Auth::IndexController < ApplicationController
  include WardenHelper

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
end
