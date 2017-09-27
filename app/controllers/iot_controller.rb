class IotController < ApplicationController
  include WardenHelper
  include RespondHelper
  layout 'iot'

  ###################### ACTION ##################################
  def test
    @login = ::Iot::Login.new
  end

  def payment_login
    @request = ::Iot::Payment.new(payment_request_params)
    if !@request.valid?
      raise ActionController::RoutingError.new('Not Found')
    end
    @login_request = ::Iot::Login.new(payment_request_params)
    @create_request = ::Iot::CreateAccount.new(payment_request_params)
    @create_request.syncCreateAccount
  end

  def do_login
    @login_request = ::Iot::Login.new login_params
    @create_request = ::Iot::CreateAccount.new(create_params(:request))

    if @login_request.signin
      raise create_params.inspect
      @request = ::Iot::Payment.new(
        payment_request_params(:request).merge(create_params(:request).slice(:account, :password))
      )
      render 'payment_request'
    else
      @request = ::Iot::Payment.new(
        payment_request_params(:request)
      )
      render 'payment_login'
    end
  end

  def payment_request
    @request = ::Iot::Payment.new(payment_request_params(:request))
    if !@request.valid?
      raise ActionController::RoutingError.new('Not Found')
    end
    @login_request = ::Iot::Login.new(payment_request_params(:request))
    @create_request = ::Iot::CreateAccount.new(payment_request_params(:request))
  end


  # def do_login
  #   token = '6480b4f1-561d-47d1-afbf-2ccc3e1ec56d'
  #   @login = ::Iot::Login.new(do_login_params(:iot_login))
  #   @create_acount = ::Iot::CreateAccount.new(create_params(:iot_login))
  #   @login.valid?
  #   if @login.errors.size > 0
  #     render 'request_page'
  #   else
  #     obj = ::Api::Iot::Login.new do_login_params(:iot_login), token
  #     success = obj.request
  #     if success
  #       obj.response_data = reverse_merge(obj.response_data, ResponseJson::Iot::Login.structure)
  #       @login.is_login = true
  #     end
  #     render 'request_page'
  #   end
  # end
  #
  # def do_create
  #   @login = ::Iot::Login.new(do_login_params(:iot_create_account))
  #   @create_acount = ::Iot::CreateAccount.new(create_params(:iot_create_account))
  #   @create_acount.valid?
  #   if @login.errors.size > 0
  #     render 'request_page'
  #   else
  #     api_params = do_login_params(:iot_create_account)
  #     api_params['account'] = create_params(:iot_create_account).account_name
  #     api_params['password'] = create_params(:iot_create_account).password
  #     raise api_params.inspect
  #     # obj = ::Api::Iot::CreateAccountByOrder.new(do_login_params)
  #     # if success
  #     #   raise obj.inspect
  #     # end
  #     render 'request_page'
  #   end
  # end
  #
  # def do_payment
  #   @login = ::Iot::Login.new(do_login_params)
  #   @create_acount.valid?
  #   if @login.errors.size > 0
  #     render 'request_page'
  #   else
  #     # call api to register
  #   end
  # end


  ###################### PARAMS ##################################
  protected
  # client_app_uid
  # resource_app_uid
  # app_user_pk
  # user_name
  # user_email
  # phone
  # order_no
  # price
  # unit
  # check_sum
  # arg
  # account
  # password
  # ip
  def request_param_keys
    [
      :client_app_uid, :resource_app_uid, :app_user_pk, :user_name,
      :product_name, :product_desc, :phone, :email,
      :order_no, :price, :unit, :checksum, :arg, :ip
    ]
  end

  def payment_request_params require_name = nil
    if require_name.nil?
      params.permit(request_param_keys)
    else
      params.require(require_name).permit(request_param_keys)
    end
  end

  def login_params
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
