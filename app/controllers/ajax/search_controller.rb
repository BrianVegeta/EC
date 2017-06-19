class Ajax::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def user
    search ::Search::User.new(search_params)
  end

  def item
    search ::Search::Item.new(search_params)
  end

  def wish
    search ::Search::Wish.new(search_params)
  end

  private
  def search_params
    params.permit(:name, :index, :size)
  end

  def search search_resource
    @search = search_resource
    @search.request
    respond true, @search.error_message, @search.response_data
  end
end
