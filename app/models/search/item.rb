class Search::Item < Search::Base
  PATH = ' '

  def path
    params = self.request_params
    "/client/item/get_item_by_name/#{params[:name]}/#{params[:index]}/#{params[:size]}"
  end

  def request_method
    :get
  end

  def handle_response_error

  end
end
