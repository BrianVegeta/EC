module RespondHelper
  extend ActiveSupport::Concern

  included do
    # helper_method :respond
  end

  def respond success, resource, status: :ok
    response = { success: success }
    response.merge!(data: resource.response_data) if resource.response_data.present?
    response.merge!(logouted: false) if resource.error_code === Response::ErrorCode::TOKEN_NOT_EXIST

    render json: response, status: status
  end
end
