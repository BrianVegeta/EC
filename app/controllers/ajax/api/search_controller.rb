class Ajax::Api::SearchController < ApplicationController
  include WardenHelper
  
  ###################### ACTION ##################################
  # 搜尋
   def multi_search
     obj = ::Api::Search::MultiSearch.new multi_search_params
     success = obj.request
     respond success, obj.error_message, obj.response_data
   end
  
  ###################### PARAMS ##################################
  protected
 
  def multi_search_params
    params.permit(:name).merge(paging_params)
  end
end