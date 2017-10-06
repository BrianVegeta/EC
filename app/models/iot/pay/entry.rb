module Iot
  module Pay
    class Entry
      include ActiveModel::Model
      include ActiveModel::Validations
      include ActionView::Helpers::NumberHelper

      attr_accessor :client_app_uid,
                    :order_no,
                    :product_name, :description, :price, :unit,
                    :app_user_pk,
                    :user_name,
                    :email,
                    :phone,
                    :checksum,
                    :arg, :return_url

      validates :client_app_uid, presence: true
      validates :order_no, presence: true
      validates :product_name, presence: true
      validates :description, presence: true
      validates :price, presence: true
      validates :unit, presence: true
      validates :app_user_pk, presence: true
      validates :user_name, presence: true
      # validates :email, presence: true, email: true
      # validates :phone, presence: true, phone: true
      validates :checksum, presence: true
      validates :arg, presence: true
      validates :return_url, presence: true

      validate :email_or_phone_present

      def initialize params
        super params
        @initial_params = params.to_h
      end

      def initial_params
        @initial_params
      end

      def payment_params
        original_params = initial_params.slice(
          :product_name, :price, :unit,
          :app_user_pk, :user_name, :email, :phone,
          :checksum, :arg, :return_url
        )
        {
          'resource_app_uid' => client_app_uid,
          'resource_app_order_no' => order_no,
          'product_desc' => description,
        }.merge original_params
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
