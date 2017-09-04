class Api::Payment::GetOrder < ApiAuthedBase

  PATH = '';

  def path
    params = self.request_params

    "/payment/get_order/#{params['uid']}/#{params['cid']}"
  end


  def request_method
    :get_token
  end

end
