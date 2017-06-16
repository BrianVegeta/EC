class User::VerificationEmail < User::Verification
  PATH = '/client/register/email/verify'

  def initialize(params, current_user)
    super
    @email = current_user['email']
    @path = PATH
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
