class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger" }

    category = Category.new("test", 1)
    @list = category.list
    raise @list.inspect
  end
end
