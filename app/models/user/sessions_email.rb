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

  def warden_session
    {
      uid: self.uid,
      name: self.name,
      apitoken: self.apitoken,
      email: self.email,
      password: self.password,
    }
  end
end
