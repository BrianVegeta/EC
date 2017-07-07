class Api::Sync::ChatRooms < ApiAuthedBase
  
  PATH = '/client/sync/chat_rooms';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end