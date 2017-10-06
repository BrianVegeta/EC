module Iot
  module User
    extend ActiveSupport::Concern

    included do
      attr_accessor :user_login_as,
                    :email_exist, :phone_exist,
                    :user_profile,
                    :current_user,
                    :user_been_checked


      def check_user_login current_user
        raise 'Need check user exist first' unless self.user_been_checked
        return if current_user.nil?
        if phone_exist? && phone === current_user['phone']
          self.user_login_as = phone and return
        end
        if email_exist? && email === current_user['email']
          self.user_login_as = email and return
        end
      end

      def is_user_login?
        self.user_login_as.present?
      end

      def request_user_data current_user
        uid = current_user['uid']
        return 'Uid not exist' if uid.nil?
        user_general_info = ::Api::Userprofile::UserGeneralInfo.new uid: uid
        user_general_info.request
        self.user_profile = user_general_info.response_data['user_profile']
      end

      def request_check_user_being
        params = initial_params.slice :email, :phone
        check = ::Api::Register::AccountIsExist.new params
        check.request
        self.email_exist = check.response_data['email_exist']
        self.phone_exist = check.response_data['phone_exist']
        self.user_been_checked = true
      end

      def email_exist?
        email_exist || false
      end

      def phone_exist?
        phone_exist || false
      end

      def is_user_exist?
        phone_exist? || email_exist?
      end

      def user
        OpenStruct.new user_profile
      end

      def login_user password, browser_info
        params = {}
        params['password'] = password
        if user_login_as === phone
          params['phone'] = phone
          session = ::Auth::Session::LoginMobile.new(params, browser_info)
        elsif user_login_as === email
          params['email'] = email
          session = ::Auth::Session::LoginEmail.new(params, browser_info)
        else
          # do nothing
        end
        session.request
        self.current_user = session.warden_session
        session
      end
    end
  end
end
