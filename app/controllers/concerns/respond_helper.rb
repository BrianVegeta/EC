module RespondHelper
  extend ActiveSupport::Concern

  included do
    # helper_method :respond
  end

  def respond success, resource, status: :ok
    response = { success: success }
    response.merge!(data: resource.response_data) unless resource.response_data.nil?
    response.merge!(logouted: true) if resource.error_code === Response::ErrorCode::TOKEN_NOT_EXIST

    render json: response, status: status
  end
end
