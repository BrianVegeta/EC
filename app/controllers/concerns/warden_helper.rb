module WardenHelper
  extend ActiveSupport::Concern

  included do
    helper_method :warden, :current_user
  end

  def current_user
    warden.user(:user)
  end

  def warden
    request.env['warden']
  end

  def user_signed_in?
    !!current_user
  end

  def authenticate_user
    unless user_signed_in?
      respond false, '請先登入' and return
    end
  end

  def authenticate!
    # warden.authenticate!(:jwt)
  end

  def warden_set_user(user)
    warden.set_user(user, scope: :user)
  end

  def apitoken
    current_user['apitoken']
  end
end
