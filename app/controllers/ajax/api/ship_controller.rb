class Ajax::Api::ShipController < ApplicationController
  include WardenHelper
  include RespondHelper
  require 'uri'
  ###################### ACTION ##################################
  # 取回7-11地址
  def select_store
    obj = ::Api::Ship::Select.new current_uid_params, current_apitoken
    html = obj.request
    responseHTLM html
  end

  def store_result
    params = store_result_params;
    max_age = "max-age=120; path=/; domain=#{Settings.domain}"
    @storeid= "storeid=#{params['storeid']}; #{max_age}"
    @storename= "storename=#{URI.encode(params['storename'])}; #{max_age}"
    @storeaddress= "storeaddress=#{URI.encode(params['storeaddress'])}; #{max_age}"
    # @storeid= 'storeid=' + 'a' + '; max-age=120;'
    # @storename= 'storename=' + 'b' + '; max-age=120;'
    # @storeaddress= 'storeaddress=' + 'c' + '; max-age=120;'
    render file: 'app/views/ajax/store/index.html.erb'
  end

  def create
    obj = ::Api::Ship::Create.new order_params, current_apitoken
    success = obj.request
    if success
      obj.response_data = reverse_merge(obj.response_data, ResponseJson::ShipOrder.structure)
    end
    respond success, obj
  end

  def order
    obj = ::Api::Ship::Order.new order_params, current_apitoken
    success = obj.request
    if success
      obj.response_data = reverse_merge(obj.response_data, ResponseJson::ShipOrder.structure)
    end
    respond success, obj
  end

  def log
    obj = ::Api::Ship::Log.new log_params, current_apitoken
    success = obj.request
    respond success, obj
  end

  ###################### PARAMS ##################################
  protected
  def store_result_params
    params.permit(:storeid, :storename, :storeaddress)
  end

  def order_params
    params.permit(:cid, :send_type).merge(current_uid_params)
  end

  def log_params
    params.permit(:order_no).merge(current_uid_params)
  end
end
