class User < ApiBase
  attr_accessor :user_profile
  def initialize(params)
    @params = params
    @error_message = ''
  end

  def error_message
    @error_message
  end



  def set_user_profile(response)
    @apitoken = response.headers['apitoken']
    self.user_profile = response['data']['user_profile']
    @uid = self.user_profile['uid']
    @name = self.user_profile['name']
  end

  class << self
    def is_email(str)
      regex = Regexp.new('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$')
      return regex.match(str)
    end
  end
end
