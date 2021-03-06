module RespondHelper
  extend ActiveSupport::Concern

  included do
    # helper_method :respond
  end

  def respond success, resource, status: :ok
    response = { success: success }
    response.merge!(data: resource.response_data) unless resource.response_data.nil?
    response.merge!(message: resource.error_message) if resource.error_message.present?
    response.merge!(logouted: true) if resource.error_code === Response::ErrorCode::TOKEN_NOT_EXIST
    # 變更資料
    response.merge!(mobileTaken: true) if resource.error_code === Response::ErrorCode::NEW_MOBILE_ALREADY_EXIST
    response.merge!(emailTaken: true) if resource.error_code === Response::ErrorCode::NEW_EMAIL_ALREADY_EXIST
    render json: response, status: status
  end

  def responseHTLM html, status: :ok
    response = { success: true, data: html, logouted: false }
    render json: response, status: status
  end

  def responseSpecial params, status: :ok
    response = { success: true, data: params, logouted: false }
    render json: response, status: status
  end
end
