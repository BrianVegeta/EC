module Iot
  class SharepayController < ApplicationController
    include WardenHelper
    include RespondHelper
    layout 'iot'

    VIEW_PAY = 'pay'
    VIEW_CONTINUE_AS = 'continue_as'
    VIEW_LOGIN = 'login'

    PAYMENT_NOT_VALID = 'Payment not valid.'
    USER_NOT_LOGIN = 'User is not login.'


    ###################### ACTION ##################################
    def test

    end

    # POST
    def index
      @payment = Iot::Pay::New.new external_payment_params, current_user
      if not @payment.valid?
        raise ActionController::RoutingError.new PAYMENT_NOT_VALID
      end

      @payment.api_check_user_exist
      @payment.match_current_user

      if @payment.is_user_login?
        @payment.api_user_profile
        render VIEW_CONTINUE_AS
      elsif @payment.is_user_exist?
        @login = Pay::Login.new external_payment_params, current_user
        render VIEW_LOGIN
      else
        # registration
        raise 'registration'
      end
    end

    # POST
    # do continue_as account
    def continue_as
      @payment = Iot::Pay::New.new payment_params, current_user
      @payment.api_check_user_exist
      @payment.match_current_user

      if not @payment.is_user_login?
        raise ActionController::RoutingError.new USER_NOT_LOGIN
      end

      if @payment.login_user browser_info
        warden_set_user @payment.current_user

        @checkout = Iot::Pay::Checkout.new payment_params, current_user
        @checkout.checkout
        @form = Iot::EsunForm.new(@checkout.esun_form)
        render 'pay' and return
      else
        raise 'error'
      end
    end

    # POST
    def pay
      if current_user.nil?
        raise ActionController::RoutingError.new USER_NOT_LOGIN
      end

      @payment = Iot::Pay::Checkout.new payment_params, current_user
      raise 'User not login' unless @payment.is_user_login?
      raise (esun_params current_user['uid']).inspect
    end

    # POST
    # use other account to login
    def switch_login
      raise params.inspect
      @login = Iot::ShareappLogin.new payment_params
      @login.payment.assign_attributes external_payment_params
      render 'login'
    end

    # POST
    def login
      @login = Iot::ShareappLogin.new external_payment_params.slice(:email, :phone)
      @login.payment.assign_attributes external_payment_params
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
        :resource_app_order_no, :price, :unit, :checksum, :arg, :ip,
        :return_url,
      ]
    end

    def payment_params
      params.require(:payment).permit(request_param_keys)
    end

    def external_payment_params
      params.permit(request_param_keys)
    end

    # def payment_params required_params = nil
    #   (required_params || params).require('payment').permit(request_param_keys)
    # end

    def external_payment_params
      params.permit(request_param_keys)
    end
  end
end
