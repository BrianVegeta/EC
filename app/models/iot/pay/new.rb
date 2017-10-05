module Iot
  module Pay
    class New < Base
      attr_accessor :user_login_as,
                    :user_profile,
                    :current_user,
                    :user_being_checked,
                    :email_exist, :phone_exist

      def api_check_user_exist
        params = initial_params.slice :email, :phone
        check = ::Api::Register::AccountIsExist.new params
        if not check.request
          raise 'connection error'
        end

        self.email_exist = email.present? && check.response_data['email_exist']
        self.phone_exist = phone.present? && check.response_data['phone_exist']
      end

      def match_current_user
        raise 'need check user exist first' if not user_been_checked_exist?
        return if current_user.nil?

        if phone_exist? && phone === current_user['phone']
          self.user_login_as = phone
        elsif email_exist? && email === current_user['email']
          self.user_login_as = email
        else
          return
        end
      end

      def is_user_login?
        self.user_login_as.present?
      end

      def is_user_exist?
        phone_exist? || email_exist?
      end

      def api_user_profile
        raise 'need set current user first' if current_user.nil?
        raise 'uid not exist in current user' if current_user['uid'].nil?
        profile = ::Api::Userprofile::UserGeneralInfo.new current_user.slice('uid')
        profile.request
        self.user_profile = profile.response_data['user_profile']
      end


      def user
        OpenStruct.new user_profile
      end

      def login_user browser_info
        params = current_user.slice('password')
        if user_login_as === phone
          params['phone'] = phone
          session = ::Auth::Session::LoginMobile.new params, browser_info
        elsif user_login_as === email
          params['email'] = email
          session = ::Auth::Session::LoginEmail.new params, browser_info
        else
          # do nothing
        end
        request_status = session.request
        self.current_user = session.warden_session
        request_status
      end

      protected
      def user_been_checked_exist?
        !email_exist.nil? && !phone_exist.nil?
      end

      def email_exist?
        email_exist || false
      end

      def phone_exist?
        phone_exist || false
      end
    end
  end
end
