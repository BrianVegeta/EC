class Api::Sync::NotificationRead < ApiAuthedBase
  
  PATH = '/client/sync/notification/read';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end