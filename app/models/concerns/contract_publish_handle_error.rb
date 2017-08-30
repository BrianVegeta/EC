module ContractPublishHandleError
  extend ActiveSupport::Concern

  SUCCESS = ::Response::ErrorCode::SUCCESS
  PID_NOT_EXIST = ::Response::ErrorCode::PID_NOT_EXIST
  CONTRACT_NOT_EXIST = ::Response::ErrorCode::CONTRACT_NOT_EXIST
  CONTRACT_EXIST = ::Response::ErrorCode::CONTRACT_EXIST
  CATEGORY_MUST_BELONG_ITEM = ::Response::ErrorCode::CATEGORY_MUST_BELONG_ITEM
  CATEGORY_MUST_BELONG_SERVICE = ::Response::ErrorCode::CATEGORY_MUST_BELONG_SERVICE
  CATEGORY_MUST_BELONG_SPACE = ::Response::ErrorCode::CATEGORY_MUST_BELONG_SPACE
  CONSTRACT_STAGE_ERROR = ::Response::ErrorCode::CONSTRACT_STAGE_ERROR
  COUPON_NO_EXIST = ::Response::ErrorCode::COUPON_NO_EXIST
  NOT_STOCK = ::Response::ErrorCode::NOT_STOCK
  LEASE_TERM_LESS_THAN_MIN_LEASE_DAYS = ::Response::ErrorCode::LEASE_TERM_LESS_THAN_MIN_LEASE_DAYS
  FORBIDDEN = Response::ErrorCode::FORBIDDEN
  USER_NOT_EXIST = Response::ErrorCode::USER_NOT_EXIST
  BAD_REQUEST = Response::ErrorCode::BAD_REQUEST
  REQUESTED_FORMAT_ERROR_PLEASE_CHECK_AGAIN = Response::ErrorCode::REQUESTED_FORMAT_ERROR_PLEASE_CHECK_AGAIN
  ILLEGAL_BANKINFO_FORMAT = Response::ErrorCode::ILLEGAL_BANKINFO_FORMAT
  NO_AUTHROIZATION_TO_ACCESS = Response::ErrorCode::NO_AUTHROIZATION_TO_ACCESS

  included do

    def handle_response_error response
      case self.error_code
      when SUCCESS
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
    when USER_NOT_EXIST
      '使用者不存在'
    when CONTRACT_NOT_EXIST
      '合約不存在'
    when CONTRACT_EXIST
      '已對此產品提出需求,待對方同意'
    when CATEGORY_MUST_BELONG_ITEM, CATEGORY_MUST_BELONG_SERVICE, CATEGORY_MUST_BELONG_SPACE
      '產品類型錯誤'
    when CONSTRACT_STAGE_ERROR
      '動作不允許'
    when COUPON_NO_EXIST
      '優惠券不存在'
    when NOT_STOCK
      '庫存不足'
    when LEASE_TERM_LESS_THAN_MIN_LEASE_DAYS
      '租期時間不符'
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
    when ILLEGAL_BANKINFO_FORMAT
      '銀行格式錯誤'
    when NO_AUTHROIZATION_TO_ACCESS
      '沒有權限'
    else
      '有個東西出錯了!'
    end
  end
end
