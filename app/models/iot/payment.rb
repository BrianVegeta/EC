class Iot::Payment
  include ActiveModel::Model
  include ActiveModel::Validations
  include ActionView::Helpers::NumberHelper
  attr_accessor :client_app_uid, :resource_app_uid, :order_no,
                :product_name, :product_desc, :price, :unit, :app_user_pk,
                :user_name, :email, :phone, :checksum, :arg

  validates :client_app_uid, presence: true
  validates :resource_app_uid, presence: true
  validates :order_no, presence: true
  validates :price, presence: true, numericality: true
  validates :app_user_pk, presence: true
  validates :user_name, presence: true
  validates :checksum, presence: true

  def price_formatter
    'NTD ' + number_to_currency(self.price)
  end

  #
  # def syncCreateAccount
  #   if (self.account_email.nil?)
  #     self.account_email = self.email
  #   end
  #   if (self.account_phone.nil?)
  #     self.account_phone = self.phone
  #   end
  #   if (self.account_name.nil?)
  #     self.account_name = self.user_name
  #   end
  # end

end
