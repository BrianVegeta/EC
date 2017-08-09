class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def prepare_browser_info
    browser = Browser.new(request.user_agent)
    @os_type = "#{browser.platform.name}"
    @device_type = "Web Browser: #{browser.name} #{browser.version}"
  end

  def browser_info
    browser = Browser.new(request.user_agent)
    {
      os_type: "#{browser.platform.name}",
      device_type: "Web Browser: #{browser.name} #{browser.version}"
    }
  end

  def respond success, message, data = nil, status = :ok,
    response = { success: success, message: message }
    response[:data] = data if data.present?
    render json: response, status: status
  end

  def respond_not_found
    render json: { success: false, message: nil }, status: 404
  end

  def reverse_merge data, format
    data.stringify_keys.merge(format.stringify_keys) do |key, v1, v2|
      v1.nil? ? v2 : v1
    end
  end

  #auto mapping to arry
  def map_json_array target, source, default = []
    if target.nil?
      return default
    else
      return target.each_with_index.map { |item, index|
        target[index] = reverse_merge(item, source) }
    end
  end


  protected
  # common params for uid request 20170705 KUAN
  def current_uid_params
    current_user.slice('uid')
  end

  # common params for uid request 20170705 KUAN
  def current_apitoken
    current_user['apitoken']
  end

  # common params for page_index request 20170705 KUAN
  def paging_params
    params.permit(:index, :size)
  end


end
