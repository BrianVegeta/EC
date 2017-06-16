class User::Profile < User
  PATH = '/client/user/get'

  def initialize(current_user)
    @uid = current_user['uid']
    @apitoken = current_user['apitoken']
    @headers = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
    @headers.merge!({ 'apitoken' => @apitoken })
    @data = nil
  end

  def data
    @data
  end

  def get
    response = self.class.post(PATH, body: { uid: @uid }.to_json, headers: @headers)
    error_code = response['error']['code']
    @error_message = ::Response::ErrorCode.localize(error_code)
    @data = response['data']
  end
end
