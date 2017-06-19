class Search::Base < ApiBase

  def handle_response_error
    case self.error_code
    when ::Response::ErrorCode::SUCCESS
      true
    else
      false
    end
  end
end
