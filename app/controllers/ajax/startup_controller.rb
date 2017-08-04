class Ajax::StartupController < ApplicationController
  
  def index
    # useless location params
    @startup = Startup.new({ city: '台北市', area: '中正區'})
    success = @startup.request
    respond success, @startup.error_message, @startup.response_data
  end
end
