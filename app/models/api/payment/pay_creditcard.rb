class Api::Payment::PayCreditcard < ApiAuthedBase

  PATH = '/payment/credit_card/esun';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
