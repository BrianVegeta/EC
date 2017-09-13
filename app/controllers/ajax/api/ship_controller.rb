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
    @storeid= 'storeid=' + params['storeid'] + '; max-age=120; path=/; domain=debug.shareapp.com.tw'
    @storename= 'storename=' + URI.encode(params['storename']) + '; max-age=120; path=/; domain=debug.shareapp.com.tw')
    @storeaddress= 'storeaddress=' + URI.encode(params['storeaddress']) + '; max-age=120; path=/; domain=debug.shareapp.com.tw'
    # @storeid= 'storeid=' + 'a' + '; max-age=120;'
    # @storename= 'storename=' + 'b' + '; max-age=120;'
    # @storeaddress= 'storeaddress=' + 'c' + '; max-age=120;'
    render file: 'app/views/ajax/store/index.html.erb'
  end

  ###################### PARAMS ##################################
  protected
  def store_result_params
    params.permit(:storeid, :storename, :storeaddress)
  end
end
