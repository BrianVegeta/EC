class Ajax::RecommendsController < ApplicationController
  before_action :set_items, except: :categories

  def categories
    @bannerUrl = false
    category_cover_image_path = view_context.image_path('category_cover.png')
    @items = [
      OpenStruct.new({ cover_url: category_cover_image_path, name: '交通工具' }),
      OpenStruct.new({ cover_url: category_cover_image_path, name: '3C' }),
      OpenStruct.new({ cover_url: category_cover_image_path, name: '相機' }),
      OpenStruct.new({ cover_url: category_cover_image_path, name: '精品配件' }),
      OpenStruct.new({ cover_url: category_cover_image_path, name: '婦幼' }),
      OpenStruct.new({ cover_url: category_cover_image_path, name: '遊戲' }),
    ]
  end

  def goods
    @bannerUrl = view_context.image_path('banner1.jpg')
    render :items
  end

  def service
    @bannerUrl = view_context.image_path('banner2.jpg')
    render :items
  end

  def space
    @bannerUrl = view_context.image_path('banner3.jpg')
    render :items
  end

  private
    def set_items
      covers = [
        'https://cfshopeetw-a.akamaihd.net/file/ba09d80607aff2201a868c07f240b71b_tn',
        'https://cfshopeetw-a.akamaihd.net/file/22e9483712eb643657f4622e8d17bf2a_tn',
        'https://cfshopeetw-a.akamaihd.net/file/9eb41fb4cabd437e70954866cbed9403_tn',
        'https://cfshopeetw-a.akamaihd.net/file/bda116e2b69865a114aef920fa2ce155_tn',
        'https://cfshopeetw-a.akamaihd.net/file/5b7cd29661d7facc3f05865b08888e77_tn',
        'https://cfshopeetw-a.akamaihd.net/file/3128049c091b710abcd6cc8d5f1f7db2_tn',
      ]

      @items = covers.map do |cover|
        OpenStruct.new({
          cover_url: cover,
          title: '微型迷你投影機家庭劇院神器迷你投影機',
          price: 'TWD$99,999/天',
          username: 'Yo, Mother fk',
          user_avatar_url: 'https://www.meionorte.com/uploads/pagina/2016/3/31/avatar-kate-hudson-dd704d2b-2cc3-4fd8-9f6d-1415f23a43a3.jpg',
          score: '999+',
        })
      end
    end
end
