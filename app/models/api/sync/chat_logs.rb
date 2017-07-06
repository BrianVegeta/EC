class Api::Sync::ChatLogs < ApiAuthedBase
  
  PATH = '/client/sync/chat_logs';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end