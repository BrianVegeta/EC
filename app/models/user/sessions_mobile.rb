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
end
