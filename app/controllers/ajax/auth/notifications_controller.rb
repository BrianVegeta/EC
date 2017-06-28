class Ajax::Auth::NotificationsController < ApplicationController
  include WardenHelper

  def index
    @notify_params = request_params
    handle_request
  end

  def contracts
    @notify_params = request_params.merge({ type: 1 })
    handle_request
  end

  def systems
    @notify_params = request_params.merge({ type: 6 })
    handle_request
  end

  def activities
    @notify_params = request_params.merge({ type: 0 })
    handle_request
  end

  private

  def request_params
    current_user.slice('uid').merge({ create_time: create_time })
  end

  def handle_request
    notification = ::Notifications::Base.new(@notify_params, apitoken)
    success = notification.request
    respond success, notification.error_message, notification.response_data
  end

  def create_time
    1.month.ago.to_i * 1000
  end
end
