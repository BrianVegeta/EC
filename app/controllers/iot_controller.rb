class IotController < ApplicationController
  include WardenHelper
  include RespondHelper
  layout 'iot'

  ###################### ACTION ##################################
  def test
    @login = ::Iot::Login.new
  end
  # 搜尋
  def request_page
    if request_payment_params['client_app_uid'].nil?
      raise ActionController::RoutingError.new('Not Found')
    end
    @login = ::Iot::Login.new(request_payment_params)
    @create_acount = ::Iot::CreateAccount.new(request_payment_params)
    @create_acount.syncCreateAccount
  end


  def do_login
    @login = ::Iot::Login.new(login_params)
    @create_acount = ::Iot::CreateAccount.new(create_params)
    @login.valid?
    if @login.errors.size > 0
      render 'request_page'
    else
      @login.is_login = true
      render 'request_page'
    end
  end

  def do_create
    @login = ::Iot::Login.new(login_params)
    @create_acount = ::Iot::CreateAccount.new(create_params)
    @create_acount.valid?
    if @login.errors.size > 0
      render 'request_page'
    else
      render 'request_page'
    end
  end

  def do_payment
    @login = ::Iot::Login.new(login_params)
    @create_acount.valid?
    if @login.errors.size > 0
      render 'request_page'
    else
      # call api to register
      
    end
  end


  ###################### PARAMS ##################################
  protected
  def request_payment_params
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
    params.permit(:client_app_uid, :resource_app_uid, :app_user_pk, :user_name,
      :user_email, :product_name, :product_desc,
      :user_phone, :order_no, :price, :unit, :checksum, :arg, :account, :password, :ip)
  end

  def login_params
    params.require(:iot_login).permit(
      :username, :password,
      :client_app_uid, :resource_app_uid, :app_user_pk,
      :user_email, :product_name, :product_desc,
      :user_name, :user_email, :user_phone,
      :order_no, :price, :unit, :checksum,
      :arg, :account, :password, :ip, :is_login
    )
  end

  def create_params
    params.require(:iot_login).permit(
      :account_username, :account_pwd, :account_email, :account_phone,
      :account_name, :account_pwd_verify,
      :client_app_uid, :resource_app_uid, :app_user_pk,
      :user_name, :user_email, :user_phone,
      :product_name, :product_desc,
      :order_no, :price, :unit, :checksum,
      :arg, :ip
    )
  end
end
