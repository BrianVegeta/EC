class Options::BankBranchs < ApiBase

  def path
    params = self.request_params
    "/client/other/branch/#{params[:bank_id]}"
  end

  def request_method
    :get
  end
end
