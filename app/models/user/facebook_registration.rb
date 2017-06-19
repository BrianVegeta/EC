class User::FacebookRegistration < User::Facebook
  PATH = '/client/register/fb/regist'

  def initialize(params)
    super
    @path = PATH
  end
end
