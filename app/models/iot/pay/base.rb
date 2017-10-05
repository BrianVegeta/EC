module Iot
  module Pay
    class Base
      include ActiveModel::Model
      include ActiveModel::Validations
      include ActionView::Helpers::NumberHelper

      attr_accessor :resource_app_uid,
                    :resource_app_order_no,
                    :app_user_pk,
                    :user_name,
                    :email, :phone,
                    :product_name, :product_desc, :price, :unit, :checksum, :arg,
                    :return_url,
                    :current_user,
                    :user_login_as


      validate :email_or_phone_present

      def initialize params, current_user = nil
        super params
        self.current_user = current_user
        @initial_params = params.to_h
      end

      def initial_params
        @initial_params
      end


      def formatted_price
        "NTD #{number_to_currency price}"
      end

      protected
      def email_or_phone_present
        if email.blank? && phone.blank?
          errors.add(:email_or_phone, 'At least email or phone.')
        end
      end
    end
  end
end
