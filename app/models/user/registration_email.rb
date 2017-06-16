class User::RegistrationEmail < User::Registration
  PATH = '/client/register/email/regist'

  def initialize(params)
    super
    @path = PATH
  end

  def email
    @params[:email]
  end

  def warden_session
    {
      email: self.email,
      password: self.password,
    }
  end
end
