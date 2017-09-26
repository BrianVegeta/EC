class Iot::Login
  include ActiveModel::Model
  include ActiveModel::Validations
  include ActionView::Helpers::NumberHelper
  attr_accessor :client_app_uid, :resource_app_uid, :order_no, :username, :password,
                :product_name,  :product_desc, :price, :unit, :app_user_pk,
                :user_name, :user_email, :user_phone, :checksum, :arg,
                :is_login

  validates :client_app_uid, presence: true
  validates :resource_app_uid, presence: true
  validates :order_no, presence: true
  validates :username, presence: true
  validates :password, presence: true
  validates :price, presence: true, numericality: true
  validates :app_user_pk, presence: true
  validates :user_name, presence: true
  validates :checksum, presence: true

  def price_formatter
    'NTD ' + number_to_currency(self.price)
  end

end
