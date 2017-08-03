class Ajax::Api::WishlistController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################
  # 上傳或更新許願紙條
   def save
     obj = ::Api::Wishlist::Save.new save_wish_params, current_apitoken
     success = obj.request
     respond success, obj
   end

   # 搜尋許願紙條
   def search
     obj = ::Api::Wishlist::Search.new search_params
     success = obj.request
     obj.response_data = map_json_array obj.response_data, ResponseJson::WishList.structure
     #if obj.response_data.nil?
     #   obj.response_data = []
     #else
     #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::WishList.structure) }
     #end
     respond success, obj
   end

   # 移除許願紙條
   def remove
     obj = ::Api::Wishlist::Remove.new remove_params, current_apitoken
     success = obj.request
     respond success, obj
   end

   ###################### PARAMS ##################################
   protected

   def save_wish_params
     # id : Long => 許願紙條ID，建立新的時候不需要填寫
     # pname : String => 標題
     # description　: String => 內文
     # city : String => 城市
     # area　: String => 地區
     # expprice　: Int => 期望價格
     # expcurrency　: string => NTD
     # expday : Int => 期望天數
     # picture　: String => 圖片(optional)
     # cat_id : String => 類型Id

     params.permit(:id, :pname, :description, :city, :area,
       :expprice, :expcurrency, :expday, :picture, :cat_id).merge(current_uid_params);
   end
   def search_params
     # last_id : Long => 上次搜尋結果ID / paging使用，避免重複; [option]
     # name : String => 搜尋標題 [option]
     # cat_id : String => 類型Id [option]
     # locations : List<Object> => 地區列表 [option]
     params.permit(:id, :name, :cat_id, locations: []).merge(paging_params)
   end
   def remove_params
     params.permit(:id).merge(current_uid_params).merge(current_uid_params)
   end
end
