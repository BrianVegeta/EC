class IndexController < ApplicationController
  include WardenHelper


  def index

  end

  def pages
    set_page_title '共享閒置資源 綠色消費'
    set_page_image view_context.asset_path 'app_logo'
    page_process
  end

  def item_page
    api_item = ::Api::Item::ViewItem.new pid: params[:pid]
    if api_item.request
      data = api_item.response_data
      price = view_context.number_to_currency data['price'], precision: 0
      set_page_title data['pname']
      set_page_description "價格#{price}, #{data['pdes']}"
      set_page_image api_item.response_data['img1']
    else
      raise 'Not found'
    end
    page_process
    render 'pages'
  end

  def test
    raise 'test page'
  end

  protected
  def page_process
    auth = { isLogin: user_signed_in? }

    if user_signed_in?
      auth_current_user = current_user

      obj = ::Api::Userprofile::UserGeneralInfo.new(isShowItem: false, uid: current_user['uid'])
      success = obj.request
      if success
        auth_current_user.merge! obj.response_data['user_profile']
        warden_set_user auth_current_user
      end
      auth.merge!(currentUser: auth_current_user.except('password', 'apitoken'))
    end

    @props = {
      auth: auth,
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
end
