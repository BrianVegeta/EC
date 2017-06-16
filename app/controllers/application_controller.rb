class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def prepare_browser_info
    browser = Browser.new(request.user_agent)
    @os_type = "#{browser.platform.name}"
    @device_type = "Web Browser: #{browser.name} #{browser.version}"
  end

  def respond success, message, status = :ok
    render :json=>{ success: success, message: message }, status: status
  end

  def respond_not_found
    render :json=>{ success: false, message: nil }, status: 404
  end
end
