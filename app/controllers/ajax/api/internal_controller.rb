class Ajax::Api::InternalController < ApplicationController
  include WardenHelper
  include RespondHelper

  ###################### ACTION ##################################
  # 取得openfire xmpp server 登入用的 resource
  def get_openfire_login_token
    obj = ::Api::Internal::GetOpenfireLoginToken.new openfire_login_token_params, current_apitoken
    success = obj.request

    respond success, obj
  end

  ###################### PARAMS ##################################
  protected
  def openfire_login_token_params
    params.permit().merge(current_uid_params)
  end
end
