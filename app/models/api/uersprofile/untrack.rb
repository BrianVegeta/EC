class Api::Userprofile::Untrack < ApiAuthedBase
  
  PATH = '/client/user/untrack';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end