# setup extracted from a working rails application
Rails.application.config.middleware.use Warden::Manager do |config|
# Rails.application.config.middleware.insert_after ActionDispatch::ParamsParser, Warden::Manager do |config|
  config.strategies.add(:jwt, JsonWebToken)
  config.default_strategies :jwt
  config.failure_app = UnauthenticatedController
  # config.default_scope = :user
  # config.scope_defaults :user, strategies: [:jwt]
  config.serialize_into_session do |user|
    user
  end
  config.serialize_from_session do |data|
    data
  end
end
