class Api::Marketing::CouponList < ApiAuthedBase
  
  PATH = '/client/marketing/coupon/list';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end