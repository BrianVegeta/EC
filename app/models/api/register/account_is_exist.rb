module Api
  module Register
    class AccountIsExist < ApiBase

      def path
        '/client/register/account/is_exist'
      end

      def request_method
         :post
      end
    end
  end
end
