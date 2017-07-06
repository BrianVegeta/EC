class Api::Sync::NotificationUnread < ApiAuthedBase
  
  PATH = '/client/sync/notification/unread';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end