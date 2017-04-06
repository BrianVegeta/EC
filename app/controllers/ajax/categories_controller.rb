class Ajax::CategoriesController < ApplicationController
  # GET /ajax/categories
  # GET /ajax/categories.json

  # GET /ajax/categories/goods.json
  def goods
    set_categories(:goods)
  end

  # GET /ajax/categories/service.json
  def service
    set_categories(:service)
  end

  # GET /ajax/categories/space.json
  def space
    set_categories(:space)
  end

  private
    def set_categories(shortname)
      filtered = Category.new.list.select do |category|
        category['id'] == Category.map_id(shortname.to_sym)
      end
      raise 'no categories' if filtered.first.empty?

      @categories = filtered.first['children']
      render 'index'
    end
end
