class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger" }

    require 'benchmark'
    time = Benchmark.measure {
      category = Category.new("test", 1)
      @list = category.list
    }
    raise time.real.inspect
    raise @list.inspect
  end
end
