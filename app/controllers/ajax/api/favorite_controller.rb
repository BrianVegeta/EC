class Ajax::Api::FavoriteController < ApplicationController
  include WardenHelper
  include RespondHelper  
  
  ###################### ACTION ##################################
  
  # 加入我的最愛
  def add
    obj = ::Api::Favorite::Add.new pid_params, current_apitoken
    success = obj.request
    respond success, obj
  end
  
  # 取回我的最愛列表
  def my_favorite
    obj = ::Api::Favorite::MyFavorite.new current_uid_params, current_apitoken
    success = obj.request
    map_json_array obj.response_data, ResponseJson::SimpleItem.structure
    #if obj.response_data.nil?
    #   obj.response_data = []
    #else
    #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::SimpleItem.structure) }
    #end
    respond success, obj    
  end
  
  # 移除我的最愛
  def remove
    obj = ::Api::Favorite::Remove.new pid_params, current_apitoken
    success = obj.request
    respond success, obj
  end
  
  ###################### PARAMS ##################################
  protected
 
  def pid_params
    # pid : Long => 商品ID
    params.permit(:pid).merge(current_uid_params);
  end
  
end