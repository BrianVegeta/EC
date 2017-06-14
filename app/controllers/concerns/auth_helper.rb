module AuthHelper
  extend ActiveSupport::Concern

  included do
    helper_method :warden, :current_user
    # prepend_before_action :authenticate!
  end

  def current_user
    warden.user
  end

  def warden
    request.env['warden']
  end

  def authenticate!
    warden.authenticate!
  end

  def warden_set(user)
    request.env['warden'].set_user(user, scope: :user)
  end
end
