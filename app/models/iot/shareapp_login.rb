module Iot
  class ShareappLogin
    include ActiveModel::Model
    include ActiveModel::Validations

    attr_accessor :email, :phone, :password

    def request
      # raise self.payment.as_json.inspect
      raise self.as_json.inspect
    end

    def payment
      @payment || @payment = Payment.new
    end
  end
end
