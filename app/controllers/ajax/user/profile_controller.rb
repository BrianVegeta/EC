class Ajax::User::ProfileController < ApplicationController
  include WardenHelper

  def get
    @user = ::User::Profile.new(current_user)
    @user.get
    respond true, @user.data
  end
end
