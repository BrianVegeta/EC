class Api::Sync::Notification < ApiAuthedBase
  
  PATH = '/client/sync/notification';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end