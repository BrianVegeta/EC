class Ajax::Api::ShipController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################
  # 取回7-11地址
  def select_store
    obj = ::Api::Ship::Select.new current_uid_params, current_apitoken
    html = obj.request
    responseHTLM html
  end

  def store_result
    # params = params.permit(:storeid, :storename, :storeaddress)
    render file: 'app/views/ajax/store/index.html.erb'
  end

  ###################### PARAMS ##################################

end
