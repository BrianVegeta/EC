class Ajax::TestController < ApplicationController
  include WardenHelper
  before_action :authenticate_user

  def test
    render json: Time.now.to_s
  end

  def test2
    @user = User::Profile.new(current_user)
    respond user_signed_in?, @user.error_message
  end
end
