class Search::Wish < ApiBase
  PATH = '/client/wish_list/search'
  def path
    PATH
  end

  def handle_response_error

  end
end
