class Iot::SharepayController < ApplicationController
  include WardenHelper
  include RespondHelper
  layout 'iot'

  ###################### ACTION ##################################
  def test

  end

  # POST
  def index
    @payment = Iot::Payment.new(payment_external_source_params)
    raise ActionController::RoutingError.new(@payment.errors.messages.inspect) unless @payment.valid?

    if current_user && (current_user['email'] || current_user['phone'])
      @user = current_user
      render 'continue_as' and return
    else
      @check = ::Api::Register::AccountIsExist.new(external_payment_params.slice(:email, :phone))
      response = @check.request

      raise @check.response_data.inspect
      raise response.inspect
    end


    redirect_to iot_sharepay_login_path(payment_external_source_params)
  end

  def continue_as
    raise 'test'
    @user = current_user
    @login_type = current_user['email'] ? 'email' : 'phone'
  end

  # GET
  def login
    @login = Iot::ShareappLogin.new external_payment_params.slice(:email, :phone)
    @login.payment.assign_attributes external_payment_params
  end

  # POST
  def do_login
    @login = Iot::ShareappLogin.new login_params
    @login.payment.assign_attributes payment_params(login_params_require)
    @login.request
  end

  # POST
  def signin
    @login = ::Iot::Login.new login_with_payment_params

    if @login.signin
      @payment = @login.build_payment
      render 'payment_request'
    else
      @payment =      @login.build_payment
      @registration = @payment.build_registration
      render 'index'
    end
  end

  def signup

  end

  def method_name

  end

  def payment_request
    @request = ::Iot::Payment.new(payment_request_params(:request))
    if !@request.valid?
      raise ActionController::RoutingError.new('Not Found')
    end
    @login_request = ::Iot::Login.new(payment_request_params(:request))
    @create_request = ::Iot::CreateAccount.new(payment_request_params(:request))
  end


  ###################### PARAMS ##################################
  protected
  # client_app_uid
  # resource_app_uid
  # app_user_pk
  # user_name
  # user_email
  # phone
  # resource_app_order_no
  # price
  # unit
  # check_sum
  # arg
  # account
  # password
  # ip
  def request_param_keys
    [
      :client_app_uid, :resource_app_uid,
      :app_user_pk, :user_name,
      :product_name, :product_desc, :phone, :email,
      :resource_app_order_no, :price, :unit, :checksum, :arg, :ip
    ]
  end

  def payment_external_source_params
    params.permit(request_param_keys)
  end

  def payment_request_params
    params.require(:request).permit(request_param_keys)
  end

  def login_with_payment_params
    params.require(:request).permit([:account, :password] << request_param_keys)
  end



  def login_params_require
    params.require(:login)
  end

  def login_params
    login_params_require.permit([:email, :phone, :password])
  end

  def payment_params required_params = nil
    (required_params || params).require('payment').permit(request_param_keys)
  end

  def external_payment_params
    params.permit(request_param_keys)
  end

  def create_params require_name = :iot_create_account
    if require_name.nil?
      params.permit(
        :account_username, :account_pwd, :account_email, :account_phone,
        :account_name, :account_pwd_verify,
      ).merge(payment_request_params(require_name))
    else
      params.require(require_name).permit(
        :account_username, :account_pwd, :account_email, :account_phone,
        :account_name, :account_pwd_verify
      ).merge(payment_request_params(require_name))
    end
  end

end
