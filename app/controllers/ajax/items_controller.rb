class Ajax::ItemsController < ApplicationController
  # GET /ajax/items
  # GET /ajax/items.json
  def index
    sleep(1)
    covers = [
      'https://cfshopeetw-a.akamaihd.net/file/ba09d80607aff2201a868c07f240b71b_tn',
      'https://cfshopeetw-a.akamaihd.net/file/22e9483712eb643657f4622e8d17bf2a_tn',
      'https://cfshopeetw-a.akamaihd.net/file/9eb41fb4cabd437e70954866cbed9403_tn',
      'https://cfshopeetw-a.akamaihd.net/file/bda116e2b69865a114aef920fa2ce155_tn',
      'https://cfshopeetw-a.akamaihd.net/file/5b7cd29661d7facc3f05865b08888e77_tn',
      'https://cfshopeetw-a.akamaihd.net/file/3128049c091b710abcd6cc8d5f1f7db2_tn',
    ]

    @items = (0..20).map do |n|
      OpenStruct.new({
        cover_url: covers.sample,
        title: '微型迷你投影機家庭劇院神器迷你投影機',
        price: 'TWD$99,999/天',
        username: 'Yo, Mother fk',
        user_avatar_url: 'https://www.meionorte.com/uploads/pagina/2016/3/31/avatar-kate-hudson-dd704d2b-2cc3-4fd8-9f6d-1415f23a43a3.jpg',
        score: '999+',
      })
    end
  end

  def recommend
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

  # GET /ajax/items/1
  # GET /ajax/items/1.json
  def show

  end

  # GET /ajax/items/new
  def new
    @ajax_item = Ajax::Item.new
  end

  # GET /ajax/items/1/edit
  def edit
    @items = ::Items::Get.new(params.permit(:pid))
    success = @items.request
    respond success, @items.error_message, @items.response_data
  end

  # POST /ajax/items
  # POST /ajax/items.json
  def create
    @ajax_item = Ajax::Item.new(ajax_item_params)

    respond_to do |format|
      if @ajax_item.save
        format.html { redirect_to @ajax_item, notice: 'Item was successfully created.' }
        format.json { render :show, status: :created, location: @ajax_item }
      else
        format.html { render :new }
        format.json { render json: @ajax_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ajax/items/1
  # PATCH/PUT /ajax/items/1.json
  def update
    respond_to do |format|
      if @ajax_item.update(ajax_item_params)
        format.html { redirect_to @ajax_item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @ajax_item }
      else
        format.html { render :edit }
        format.json { render json: @ajax_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ajax/items/1
  # DELETE /ajax/items/1.json
  def destroy
    @ajax_item.destroy
    respond_to do |format|
      format.html { redirect_to ajax_items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ajax_item
      @ajax_item = Ajax::Item.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ajax_item_params
      params.fetch(:ajax_item, {})
    end
end
