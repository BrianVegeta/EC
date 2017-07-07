class Api::Sync::NotificationUnreadCount < ApiAuthedBase
  
  PATH = '/client/sync/notification/unread_count';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end