class IndexController < ApplicationController
  def index

  end

  def pages

    @props = {
      routesHelper: {
        root: root_path,
        items: {
          root: pages_path('i'),
          goods: pages_path('i/goods'),
          service: pages_path('i/service'),
          space: pages_path('i/space'),
        },
        item: pages_path,
        categories: pages_path('categories'),
        ajaxGetBanners: ajax_banners_path(:json),
        ajax: {
          items: ajax_items_path(:json),
          categories: ajax_categories_path(:json),
          recommend: {
            category: categories_ajax_recommends_path(:json),
            goods: goods_ajax_recommends_path(:json),
            service: service_ajax_recommends_path(:json),
            space: space_ajax_recommends_path(:json),
          }
        }
      }
    }
  end

  def test
    raise 'test page'
  end
end
