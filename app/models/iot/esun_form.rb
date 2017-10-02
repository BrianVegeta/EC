module Iot
  class EsunForm
    include ActiveModel::Model

    attr_accessor :data, :mac, :ksn, :redirect
  end
end
