module Iot
  module Pay
    module Concerns
      module Auth
        extend ActiveSupport::Concern

        included do
          attr_accessor :identify_by,
                        :auth_email,
                        :auth_phone

          validates :identify_by, presence: true, inclusion: { in: %w(email phone) }
          validates :auth_email, presence: true, email: true, if: :identify_by_email?
          validates :auth_phone, presence: true, phone: true, if: :identify_by_phone?

          def identify_by_email?
            identify_by.present? && identify_by.to_sym == :email
          end

          def identify_by_phone?
            identify_by.present? && identify_by.to_sym == :phone
          end

          def set_user_login_as
            case identify_by.to_sym
            when :email
              self.user_login_as = auth_email
            when :phone
              self.user_login_as = auth_phone
            else
              raise 'invalid auth by'
            end
          end

        end
      end
    end
  end
end
