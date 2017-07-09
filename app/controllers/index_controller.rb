class IndexController < ApplicationController
  include WardenHelper

  def index

  end

  def pages
    @props = {
      auth: {
        isLogin: user_signed_in?,
        currentUser: current_user.except('password', 'apitoken'),
      },
      routesHelper: {
        root: root_path,
        items: {
          root: pages_path('i'),
          goods: pages_path('i/goods'),
          service: pages_path('i/service'),
          space: pages_path('i/space'),
        },
        item: pages_path,
        tanzaku: pages_path('wish'),
        release: pages_path('release_item'),
        categories: pages_path('categories'),
        ajaxGetBanners: ajax_banners_path(:json),
        ajax: {
          itemCover: item_cover_ajax_images_path(:json),
          items: ajax_items_path(:json),
          categories: ajax_categories_path(:json),
          cities: cities_ajax_addresses_path(:json),
          cityZones: zones_ajax_addresses_path(:json, city: 'qCity'),
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
