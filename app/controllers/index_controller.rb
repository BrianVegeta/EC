class IndexController < ApplicationController
  def index

  end

  def pages

    @props = {
      routes: {
        root: root_path,
        pageItem: pages_path('item'),
        ajaxGetBanners: ajax_banners_path(:json),
        ajax: {
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
