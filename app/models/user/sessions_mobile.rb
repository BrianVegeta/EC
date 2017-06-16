class User::SessionsMobile < User::Sessions
  PATH = '/client/session/mobile/login'

  def initialize(params)
    super
    @params = params
    @path = PATH
    @phone = params[:phone]
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
