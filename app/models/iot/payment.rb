module Iot
  class Payment
    include ActiveModel::Model
    include ActiveModel::Validations
    include ActionView::Helpers::NumberHelper

    include InitializeParams
    include User

    attr_accessor :client_app_uid,
                  :resource_app_uid,
                  :resource_app_order_no,
                  :app_user_pk,
                  :user_name,
                  :email, :phone,
                  :product_name, :product_desc, :price, :unit, :checksum, :arg,
                  :user_login_as,
                  :email_exist, :phone_exist,
                  :user_profile,
                  :return_url


    validate :email_or_phone_present


    def formatted_price
      'NTD ' + number_to_currency(self.price)
    end

    protected
    def email_or_phone_present
      if email.blank? && phone.blank?
        errors.add(:email_or_phone, 'At least email or phone.')
      end
    end
  end
end
