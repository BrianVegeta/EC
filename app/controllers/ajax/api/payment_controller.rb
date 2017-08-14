class Ajax::Api::PaymentController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################
  # 搜尋
   def search
     obj = ::Api::Payment::Search.new search_params, current_apitoken
     success = obj.request
     # if success
     #  obj.response_data = parse_balance_rsp(obj.response_data)
     #end
     #if obj.response_data.nil?
     #   obj.response_data = []
     #else
     #   obj.response_data.map { |item, index| reverse_merge(item, ResponseJson::UserCoupon.structure) }
     #end
     respond success, obj
   end

  ###################### PARAMS ##################################
  protected
  def parse_balance_rsp(response_data)
    response_data = response_data.reverse_merge(response_data, ResponseJson:AccountBalance.structure)
    return response_data
  end

  def search_params
    #start_date : Long => 搜尋開始時間
    #end_date : Long => 搜尋結束時間
    #type : String => ALL, IN, OUT
    params.permit(:start_date, :end_date, :type).merge(current_uid_params).merge(paging_params);
  end
end
