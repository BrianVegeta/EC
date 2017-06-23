module WardenHelper
  extend ActiveSupport::Concern

  included do
    helper_method :warden, :current_user
    # prepend_before_action :set_auth_token, :pass_header_to_warden
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

  def pass_header_to_warden
    request.env['CUS_HTTP_HEADER'] = request.headers
  end

  def set_auth_token
    return if current_user.nil?
    response['Authorization'] = "Bearer #{JWTWrapper.encode current_user}"
  end
end
