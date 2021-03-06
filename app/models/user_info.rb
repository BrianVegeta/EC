class UserInfo < ApiBase
  PATH = '/client/user/general_user_info'

  def initialize params
    super
  end

  def path
    PATH
  end

  def handle_response_error
    case self.error_code
    when ::Response::ErrorCode::SUCCESS
      true
    else
      false
    end
  end
end
