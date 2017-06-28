class Notifications::Base < ApiAuthedBase
  PATH = '/client/sync/notification'

  attr_accessor :apitoken
  def initialize params, apitoken
    super
    self.apitoken = apitoken
  end

  def path
    PATH
  end
end
