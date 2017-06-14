class Ajax::TestController < ApplicationController
  include WardenHelper
  protect_from_forgery

  def test
    warden_set({apitoken: Time.now.to_s})
    render json: Time.now.to_s
  end

  def test2
    jwt_token = "Bearer #{'afafaf'}"
    response['Authorization'] = "Bearer #{'afafaf'}"
    render json: current_user
    return
  end
end
