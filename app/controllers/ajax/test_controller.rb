class Ajax::TestController < ApplicationController
  include WardenHelper
  before_action :authenticate_user

  def test
    warden.logout(:user)
    respond true, '已成功登出'
  end

  def test2
    @user = User::Profile.new(current_user)
    respond user_signed_in?, @user.error_message
  end
end
