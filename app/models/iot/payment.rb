module Iot
  class Payment
    include ActiveModel::Model
    include ActiveModel::Validations
    include ActionView::Helpers::NumberHelper
    # include InitializeParams

    attr_accessor :client_app_uid, :resource_app_uid, :resource_app_order_no,
                  :app_user_pk,
                  :user_name,
                  :email, :phone,
                  :product_name, :product_desc, :price, :unit, :checksum, :arg

    validates :client_app_uid, presence: true
    validates :product_name, presence: true
    validates :resource_app_uid, presence: true
    validates :resource_app_order_no, presence: true
    validates :price, presence: true, numericality: true
    validates :app_user_pk, presence: true
    validates :user_name, presence: true
    validates :checksum, presence: true

    validate :email_or_phone
    def formatted_price
      'NTD ' + number_to_currency(self.price)
    end

    def build_login params = {}
      Login.new self.initial_params.merge(params)
    end

    def build_registration params = {}
      Registration.new self.initial_params.merge(params)
    end

    def payment
      self
    end

    def bind_order
      raise initial_params.slice('client_app_uid')
    end

    def email_or_phone
      if email.blank? && phone.blank?
        errors.add(:email_or_phone, 'At least email or phone.')
      end
    end
  end
end
