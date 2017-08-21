class Api::Contract::GetReport < ApiAuthedBase

  PATH = '';

  def path
    params = self.request_params

    "/client/contract/get_report"
  end


  def request_method
    :post_token
  end

end
