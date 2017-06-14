# setup extracted from a working rails application
Rails.application.config.middleware.use Warden::Manager do |config|
  config.default_strategies :jwt
  config.strategies.add(:jwt, JsonWebToken)
  config.failure_app = UnauthenticatedController
  config.default_scope = :user
  config.scope_defaults :user, strategies: [:jwt]
  config.serialize_into_session do |user|
    user
  end
  config.serialize_from_session do |data|
    data
  end
end
