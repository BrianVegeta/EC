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

        end
      end
    end
  end
end
