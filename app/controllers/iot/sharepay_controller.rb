class Iot::SharepayController < ApplicationController
  include WardenHelper
  include RespondHelper
  layout 'iot'

  ###################### ACTION ##################################
  def test
    @login = Iot::Login.new
  end

  # POST
  def index
    @payment = Iot::Payment.new(payment_external_source_params)
    raise ActionController::RoutingError.new(@payment.errors.messages.inspect) unless @payment.valid?
    @login =        @payment.build_login
    @registration = @payment.build_registration
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
