class Ajax::Api::SearchController < ApplicationController
  include WardenHelper
  include RespondHelper
  ###################### ACTION ##################################
  # 搜尋
   def multi_search
     obj = ::Api::Search::MultiSearch.new multi_search_params
     success = obj.request
     if success
       obj.response_data = reverse_merge(obj.response_data, ResponseJson::MultiSearch.structure)
     end
     respond success, obj
   end

   def user
     obj = ::Api::Search::User.new multi_search_params
     success = obj.request
     respond success, obj
   end

   def item
     obj = ::Api::Search::Item.new multi_search_params
     success = obj.request
     respond success, obj
   end

   def wish
     obj = ::Api::Search::Wish.new multi_search_params
     success = obj.request
     respond success, obj
   end

  ###################### PARAMS ##################################
  protected

  def multi_search_params
    params.permit(:name).merge(paging_params)
  end
end
