class Iot::CreateAccount
  include ActiveModel::Model
  include ActiveModel::Validations
  include ActionView::Helpers::NumberHelper
  attr_accessor :client_app_uid, :resource_app_uid, :order_no,
                :product_name,  :product_desc, :price, :unit, :app_user_pk,
                :user_name, :user_email, :user_phone, :checksum, :arg,
                :account_username, :account_pwd, :account_email, :account_phone,
                :account_name, :account_pwd_verify

  validates :account_username, presence: true
  validates :account_pwd, presence: true
  validates :account_pwd_verify, presence: true
  validates :account_username, presence: true
  validates :client_app_uid, presence: true
  validates :resource_app_uid, presence: true
  validates :order_no, presence: true
  validates :username, presence: true
  validates :password, presence: true
  validates :price, presence: true, numericality: true
  validates :app_user_pk, presence: true
  validates :user_name, presence: true
  validates :checksum, presence: true

  def syncCreateAccount()
    if (self.account_email.nil?)
      self.account_email = self.user_email
    end
    if (self.account_phone.nil?)
      self.account_phone = self.user_phone
    end
    if (self.account_name.nil?)
      self.account_name = self.user_name
    end
  end

end
