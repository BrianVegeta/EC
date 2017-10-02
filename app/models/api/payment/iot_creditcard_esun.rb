class Api::Payment::IotCreditcardEsun < ApiAuthedBase


  def path
    '/payment/IoT/credit_card/esun'
  end

  def request_method
     :post_token
  end
end
