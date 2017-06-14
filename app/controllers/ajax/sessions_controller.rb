class Ajax::SessionsController < ApplicationController
  include WardenHelper
  # prepend_before_action :require_no_authentication, only: [:new, :create]
  # prepend_before_action :allow_params_authentication!, only: :create
  # prepend_before_action :verify_signed_out_user, only: :destroy
  # prepend_before_action only: [:create, :destroy] { request.env["devise.skip_timeout"] = true }
  protect_from_forgery

  def create
    # self.resource = Warden.authenticate!(auth_options)
    # raise request.params.inspect
    request.env['CUS_HTTP_HEADER'] = request.headers
    resource = env['warden'].authenticate!

    render json: current_user
    return
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource)
  end

  def destroy
    sign_out(resource_name)
  end

  protected
  def auth_options
    { scope: :user }
  end
  def ensure_params_exist
    return unless params[:user_login].blank?
    render :json=>{:success=>false, :message=>"missing user_login parameter"}, :status=>422
  end

  def invalid_login_attempt
    warden.custom_failure!
    render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
  end
end
