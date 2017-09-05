class Api::Userprofile::CommentsCount < ApiBase

  PATH = '/client/user/comments/count';

  def path
    PATH
  end

  def request_method
     :post
  end

end
