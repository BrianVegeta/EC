class Api::Userprofile::Search < ApiBase
  
  PATH = '/client/user/search';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end