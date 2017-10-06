module Iot
  class SharepayController < ApplicationController
    include WardenHelper
    include RespondHelper
    layout 'iot'

    VIEW_PAY = 'pay'
    VIEW_CONTINUE_AS = 'continue_as'
    VIEW_LOGIN = 'login'
    VIEW_REGISTER = 'register'
    VIEW_VERIFY = 'verify'

    PAYMENT_NOT_VALID = 'Payment not valid.'
    USER_NOT_LOGIN = 'User is not login.'


    ###################### ACTION ##################################
    def test

    end

    # POST
    def index
      entry = Pay::Entry.new entry_params
      if not entry.valid?
        raise ActionController::RoutingError.new PAYMENT_NOT_VALID
      end

      @payment = Iot::Pay::New.new entry.payment_params, current_user
      @payment.api_check_user_exist
      @payment.match_current_user

      if @payment.is_user_login?
        @payment.api_user_profile
        render VIEW_CONTINUE_AS

      elsif @payment.is_user_exist?
        @login = Pay::Login.new entry.payment_params, current_user
        @login.sync_auth_email if @payment.email_exist?
        @login.sync_auth_phone if @payment.phone_exist?
        render VIEW_LOGIN

      else
        @registration = Pay::Registration.new entry.payment_params, current_user
        @registration.sync_payment_info
        render VIEW_REGISTER

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
        process_after_login @payment
        render VIEW_PAY and return
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
      if not @payment.is_user_login?
        raise ActionController::RoutingError.new USER_NOT_LOGIN
      end
      raise (esun_params current_user['uid']).inspect
    end

    # POST
    # use other account to login
    def switch_login
      @login = Iot::Pay::Login.new login_params, current_user
      @login.sync_auth_email
      @login.sync_auth_phone
      @payment = Iot::Pay::New.new payment_params, current_user
      render VIEW_LOGIN
    end

    def switch_register
      @registration = Pay::Registration.new payment_params, current_user
      @registration.sync_payment_info
      @payment = Iot::Pay::New.new payment_params, current_user
      render VIEW_REGISTER
    end

    # POST
    def login
      @login = Iot::Pay::Login.new login_params, current_user
      @login.sync_auth_email
      @login.sync_auth_phone
      @payment = Iot::Pay::New.new payment_params, current_user
      if @login.login_user browser_info
        process_after_login @login
        render VIEW_PAY and return
      else

      end
    end

    # POST
    def register
      @registration = Iot::Pay::Registration.new register_params, current_user
      @registration.sync_payment_info
      @payment = Iot::Pay::New.new payment_params, current_user
      if @registration.register
        init_verification
        render VIEW_VERIFY
      else

      end
    end

    # POST
    def verify
      init_verification

      if @verification.verify browser_info
        @verification.update_name current_apitoken
        warden_set_user @verification.current_user
        @payment = @verification
        @checkout = Iot::Pay::Checkout.new payment_params, current_user
        @checkout.checkout
        @form = Iot::EsunForm.new(@checkout.esun_form)
        render VIEW_PAY
      else
        @payment = @verification
      end
    end


    ###################### PARAMS ##################################
    private

    def init_verification
      @verification = Iot::Pay::Verification.new verify_params, current_user
    end

    def process_after_login payment
      warden_set_user payment.current_user
      @payment = payment
      @checkout = Iot::Pay::Checkout.new payment_params, current_user
      @checkout.checkout
      @form = Iot::EsunForm.new(@checkout.esun_form)
    end
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
        :resource_app_uid,
        :app_user_pk, :user_name,
        :product_name, :product_desc, :phone, :email,
        :resource_app_order_no, :price, :unit, :checksum, :arg, :ip,
        :return_url,
      ]
    end

    def auth_params_keys
      [ :auth_email, :auth_phone, :identify_by ]
    end

    def entry_params
      params.permit(
        :client_app_uid, :order_no,
        :app_user_pk, :user_name,
        :product_name, :description, :price, :unit,
        :phone, :email,
        :checksum, :arg, :return_url,
      )
    end

    def payment_params
      params.require(:payment).permit(request_param_keys)
    end

    def login_params
      login = params.require(:payment).permit(
        auth_params_keys, :password
      )
      payment_params.merge login
    end

    def register_params
      registration = params.require(:payment).permit(
        auth_params_keys, :password, :password_confirmation, :name,
      )
      payment_params.merge registration
    end

    def verify_params
      verifycation = params.require(:payment).permit(
        auth_params_keys, :password, :name, :identify_by, :verify_code
      )
      payment_params.merge verifycation
    end

    def external_payment_params
      params.permit(request_param_keys)
    end

    def external_payment_params
      params.permit(request_param_keys)
    end
  end
end
