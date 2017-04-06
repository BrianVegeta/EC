class Ajax::CategoriesController < ApplicationController
  # GET /ajax/categories
  # GET /ajax/categories.json
  def index
    @categories = Category.new.list
    @goods_categories = extract_categories(:goods, @categories)
    @service_categories = extract_categories(:service, @categories)
    @space_categories = extract_categories(:space, @categories)
  end

  private
    def extract_categories(shortname, categories)
      filtered = Category.new.list.select do |category|
        category['id'] == Category.map_id(shortname.to_sym)
      end
      raise 'no categories' if filtered.first.empty?

      filtered.first['children']
    end
end
