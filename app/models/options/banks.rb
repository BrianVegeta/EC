class Options::Banks < ApiBase
  PATH = '/client/other/ATMBanks';

  def path
    PATH
  end

  def request_method
    :get
  end
end
