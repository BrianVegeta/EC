module HandleError::FacebookBind
  extend ActiveSupport::Concern

  SUCCESS = ::Response::ErrorCode::SUCCESS
  ALL_CONFIRM = ::Response::ErrorCode::ALL_CONFIRM
  USER_EXIST = ::Response::ErrorCode::USER_EXIST
  USER_NOT_EXIST = ::Response::ErrorCode::USER_NOT_EXIST

  included do

    def handle_response_error response
      case self.error_code
      when SUCCESS, ALL_CONFIRM
        true
      else
        self.error_message = catch_error_message(self.error_code)
        false
      end
    end
  end

  private
  def catch_error_message error_code
    case error_code
    when USER_NOT_EXIST
      '錯誤的facebook帳號'
    when USER_EXIST
      '此facebook帳號已被使用'
    else
      '有個東西出錯了!'
    end
  end
end
