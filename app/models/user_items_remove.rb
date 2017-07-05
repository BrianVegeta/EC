class UserItemsRemove < ApiBase
  PATH = '/client/item/remove_items'

  attr_accessor :apitoken

  def initialize params, apitoken
    super
    self.apitoken = apitoken
  end

  def path
    PATH
  end

  def request_api
    response = self.class.post(
      self.path,
      body: self.request_params.to_json,
      headers: HEADERS.merge!(self.apitoken)
    )
    case response.code
    when 200
      response
    when 404
      raise 'NOT FOUND'
    else
      raise response.inspect
      raise "ZOMG ERROR #{response.code}"
    end
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
