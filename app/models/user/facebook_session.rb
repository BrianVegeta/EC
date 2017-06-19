class User::FacebookSession < User::Facebook
  PATH = '/client/session/fb/login'

  def initialize(params)
    super
    @path = PATH
  end
end
