class Iot::Login
  include ActiveModel::Model
  include ActiveModel::Validations
  attr_accessor :username, :password

  validates :username, presence: true
end
