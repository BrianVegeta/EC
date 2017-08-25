module ItemPublishHandleError
  extend ActiveSupport::Concern

  SUCCESS = ::Response::ErrorCode::SUCCESS
  ALL_CONFIRM = ::Response::ErrorCode::ALL_CONFIRM
  PID_NOT_EXIST = ::Response::ErrorCode::PID_NOT_EXIST
  FORBIDDEN = Response::ErrorCode::FORBIDDEN
  USER_NOT_EXIST = Response::ErrorCode::USER_NOT_EXIST
  ITEM_CATEGORY_NOT_EXIST = Response::ErrorCode::ITEM_CATEGORY_NOT_EXIST
  BAD_REQUEST = Response::ErrorCode::BAD_REQUEST
  REQUESTED_FORMAT_ERROR_PLEASE_CHECK_AGAIN = Response::ErrorCode::REQUESTED_FORMAT_ERROR_PLEASE_CHECK_AGAIN

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
    when PID_NOT_EXIST
      '更新時 PID 不存在'
    when FORBIDDEN
      '設定日期過期'
    when USER_NOT_EXIST
      '找不到使用者'
    when ITEM_CATEGORY_NOT_EXIST
      '分類錯誤'
    when BAD_REQUEST
      '資料不齊全'
    when REQUESTED_FORMAT_ERROR_PLEASE_CHECK_AGAIN
      '標籤重複'
    else
      '有個東西出錯了!'
    end
  end
end
