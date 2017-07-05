class Ajax::Api::FavoriteController < ApplicationController
  include WardenHelper
  
  ###################### ACTION ##################################
  def add
    obj = ::Api::Favorite::Add.new pid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  def my_favorite
    obj = ::Api::Favorite::MyFavorite.new current_uid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data    
  end
  
  def remove
    obj = ::Api::Favorite::Remove.new pid_params, current_apitoken
    success = obj.request
    respond success, obj.error_message, obj.response_data
  end
  
  ###################### PARAMS ##################################
  protected
 
  def pid_params
    # pid : Long => 商品ID
    params.permit(:pid).merge(current_uid_params);
  end
  
end