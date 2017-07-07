class Api::Userprofile::OwnerComments < ApiBase
  
  PATH = '/client/user/owner/comments';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end