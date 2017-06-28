class User::SessionsEmail < User::Sessions
  PATH = '/client/session/email/login'

  def initialize(params)
    super
    @params = params
    @path = PATH
    @email = params[:email]
  end

  def email
    @email
  end
end
