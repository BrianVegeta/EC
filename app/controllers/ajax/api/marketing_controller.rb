class Ajax::Api::MarketingController < ApplicationController
  include WardenHelper
  
  ###################### ACTION ##################################
  # 搜尋
   def coupon_list
     obj = ::Api::Marketing::CouponList.new current_uid_params, current_apitoken
     success = obj.request
     respond success, obj.error_message, obj.response_data
   end
  
  ###################### PARAMS ##################################

end