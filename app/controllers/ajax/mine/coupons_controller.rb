class Ajax::Mine::CouponsController < ApplicationController
  include WardenHelper
  prepend_before_action :authenticate_user

  def index
    @coupons = Coupon.new(current_user.slice('uid'), current_user.slice('apitoken'))
    success = @coupons.request
    respond success, @coupons.error_message, @coupons.response_data
  end
end
