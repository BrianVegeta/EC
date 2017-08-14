class Api::Payment::Search < ApiAuthedBase

  PATH = '/payment/account_balance/page_search';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
