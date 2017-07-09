class Ajax::Api::MarketingController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################
  # 搜尋
   def coupon_list
     obj = ::Api::Marketing::CouponList.new current_uid_params, current_apitoken
     success = obj.request

     respond success, obj
   end

  ###################### PARAMS ##################################

end
