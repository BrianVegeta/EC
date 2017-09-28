module InitializeParams
  extend ActiveSupport::Concern

  included do

    def initialize params = {}
      @initial_params = params.to_h
      super
    end

    def initial_params
      @initial_params
    end
  end
end
