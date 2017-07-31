class Ajax::Api::MarketingController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################
  # 搜尋
   def coupon_list
     obj = ::Api::Marketing::CouponList.new current_uid_params, current_apitoken
     success = obj.request
     obj.response_data = map_json_array obj.response_data, ResponseJson::UserCoupon.structure
     #if obj.response_data.nil?
     #   obj.response_data = []
     #else
     #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::UserCoupon.structure) }
     #end
     respond success, obj
   end

  ###################### PARAMS ##################################

end
