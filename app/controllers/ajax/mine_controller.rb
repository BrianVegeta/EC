class Ajax::MineController < ApplicationController
  def items
    @items = UserItems.new(uid: 'SACBA0PB')
    # @items = UserItems.new(uid: 'SACCN033')
    # TODO: [#MY][1]
    success = @items.request
    respond success, 'success', @items.response_data
  end
end
