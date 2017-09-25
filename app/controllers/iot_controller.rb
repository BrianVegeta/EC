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
    params = request_payment_params
    if params['client_app_uid'].nil?
      raise ActionController::RoutingError.new('Not Found')
    end
    @product_name = params['product_name']
    @product_desc = params['product_desc']
    @price = params['price']
    @order_no = params['order_no']
    # if is_login?
    #   @login = ::Iot::Login.new
    #   render 'login'
    # else
    #   render 'detail'
    # end
    # redirect_to "/p/iot/payment/login"
    # render 'request_page'

    # obj = Api::Iot::RegisOrder.new params
    #
    # if obj.success
    #   raise params['store_uid'].inspect
    # else
    #   raise ActionController::RoutingError.new('Not Found')
    # end
  end

  # login post
  def do_login
    # login
    @login = ::Iot::Login.new(login_params)
    @login.valid?
    raise @login.errors[:username].first.inspect
    # render 'detail' if succces
  end


  ###################### PARAMS ##################################
  protected
  def request_payment_params
    # client_app_uid
    # resource_app_uid
    # app_user_pk
    # name
    # email
    # phone
    # order_no
    # price
    # unit
    # check_sum
    # arg
    # account
    # password
    # ip
    params.permit(:client_app_uid, :resouce_app_uid, :app_user_pk, :name, :email,
      :product_name, :product_desc,
      :phone, :order_no, :price, :unit, :check_sum, :arg, :account, :password, :ip)
  end

  def login_params
    params.require(:iot_login).permit(:username)
  end
end
