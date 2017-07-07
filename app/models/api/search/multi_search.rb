class Api::Search::MultiSearch < ApiBase
  
  PATH = '/client/search/multi-search';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end