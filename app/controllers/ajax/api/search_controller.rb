class Ajax::Api::SearchController < ApplicationController
  include WardenHelper
  
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
  
  ###################### PARAMS ##################################
  protected
 
  def multi_search_params
    params.permit(:name).merge(paging_params)
  end
end