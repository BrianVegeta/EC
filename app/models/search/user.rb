class Search::User < Search::Base
  PATH = '/client/user/search'

  def path
    PATH
  end

  def handle_response_error

  end
end
