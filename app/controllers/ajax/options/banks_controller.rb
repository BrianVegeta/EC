class Ajax::Options::BanksController < ApplicationController
  include WardenHelper
  include RespondHelper

  # GET /ajax/banks.json
  def index
    obj = ::Options::Banks.new

    success = obj.request
    respond success, obj
  end

  # GET /ajax/bank_branchs.json
  def branchs
    obj = ::Options::BankBranchs.new bank_branchs_params

    success = obj.request
    respond success, obj
  end

  private
  def bank_branchs_params
    params.permit(:bank_id)
  end
end
