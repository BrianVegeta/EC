class Ajax::Mine::ItemsController < ApplicationController
  include WardenHelper
  prepend_before_action :authenticate_user

  def index
    @items = UserItems.new(uid: 'SACBA0PB')
    # @items = UserItems.new(uid: 'SACCN033')
    # TODO: [#MY][1]
    success = @items.request
    respond success, 'success', @items.response_data
  end

  def multi_remove
    @remove_items = UserItemsRemove.new(remove_params, apitoken)
    success = @remove_items.request
    respond success, 'success', @remove_items.error_message
  end

  private
  def remove_params
    params.permit(pids: []).merge(current_user.slice('uid'))
  end

  def apitoken
    current_user.slice('apitoken')
  end
end
