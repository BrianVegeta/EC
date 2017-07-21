class Ajax::SearchController < ApplicationController
  include RespondHelper

  def user
    search ::Search::User.new(search_params)
  end

  def item
    search ::Search::Item.new(search_params)
  end

  def wish
    search ::Search::Wish.new(search_params)
  end

  def multi
    search ::Search::Multi.new(search_params)
  end

  private
  def search_params
    params.permit(:name, :index, :size)
  end

  def search search_resource
    @search = search_resource
    @search.request
    respond true, @search
  end
end
