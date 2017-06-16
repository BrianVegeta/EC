class User::RegistrationMobile < User::Registration
  PATH = '/client/register/mobile/regist'

  def initialize(params)
    super
    @path = PATH
  end

  def phone
    @params[:phone]
  end

  def warden_session
    {
      phone: self.phone,
      password: self.password,
    }
  end
end
