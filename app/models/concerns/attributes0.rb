module Attributes
  extend ActiveSupport::Concern

  included do
    raise @test.inspect
    define_method "test2" do
      "test2"
    end
  end
end
