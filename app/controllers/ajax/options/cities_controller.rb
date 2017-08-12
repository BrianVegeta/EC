class Ajax::Options::CitiesController < ApplicationController
  include WardenHelper
  include RespondHelper

  # GET /ajax/cities.json
  def index
    obj = ::Options::Cities.new

    success = obj.request
    respond success, obj
  end

  # GET /ajax/city_areas.json
  def areas
    obj = ::Options::CityAreas.new city_areas_params

    success = obj.request
    respond success, obj
  end

  private
  def city_areas_params
    params.permit(:city_name)
  end
end
