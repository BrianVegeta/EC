class User::VerificationMobile < User::Verification
  PATH = '/client/register/mobile/verify'

  def initialize(params, current_user)
    super
    @phone = current_user['phone']
    @path = PATH
  end

  def phone
    @phone
  end

  def warden_session
    {
      uid: self.uid,
      name: self.name,
      apitoken: self.apitoken,
      phone: self.phone,
      password: self.password,
    }
  end
end
