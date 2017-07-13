class Ajax::OptionsController < ApplicationController
  include WardenHelper
  include RespondHelper

  def banks
    obj = ::Options::Banks.new

    success = obj.request
    respond success, obj
  end

  def bank_branchs
    obj = ::Options::BankBranchs.new bank_branchs_params

    success = obj.request
    respond success, obj
  end

  private
  def bank_branchs_params
    params.permit(:bank_id)
  end
end
