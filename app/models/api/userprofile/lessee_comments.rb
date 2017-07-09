class Api::Userprofile::LesseeComments < ApiBase
  
  PATH = '/client/user/lessee/comments';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end