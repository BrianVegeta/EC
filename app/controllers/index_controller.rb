class IndexController < ApplicationController
  def index

  end

  def pages

    @props = {
      routes: {
        root: root_path,
        pageItem: pages_path('item'),
        ajaxGetBanners: ajax_banners_path(:json),
      }
    }
  end

  def test
    raise 'test page'
  end
end
