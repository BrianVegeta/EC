class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def prepare_browser_info
    browser = Browser.new(request.user_agent)
    @os_type = "#{browser.platform.name}"
    @device_type = "Web Browser: #{browser.name} #{browser.version}"
  end

  def respond success, message, data = nil, status = :ok,
    response = { success: success, message: message }
    response[:data] = data if data.present?
    render json: response, status: status
  end

  def respond_not_found
    render json: { success: false, message: nil }, status: 404
  end
end
