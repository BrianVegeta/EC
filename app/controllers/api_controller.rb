class ApiController < ActionController:: API
  def category
    category = Category.new("test", 1)
    @list = category.list
  end
end
