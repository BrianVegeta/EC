class Ajax::Options::CategoriesController < ApplicationController
  include WardenHelper
  include RespondHelper

  # GET /ajax/categories.json
  def index
    obj = ::Options::Categories.new

    success = obj.request
    if success
      response_data = obj.response_data
      obj.response_data = Hash.new
      obj.response_data[:goods] = find_categories response_data, 1
      obj.response_data[:service] = find_categories response_data, 2
      obj.response_data[:space] = find_categories response_data, 3
    end
    respond success, obj
  end

  private
  def find_categories categories, id
    index = categories.find_index { |item| item['id'] == id }
    return [] if index.nil?
    categories[index]['children']
  end
end
