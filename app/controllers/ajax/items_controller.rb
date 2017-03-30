class Ajax::ItemsController < ApplicationController
  before_action :set_ajax_item, only: [:show, :edit, :update, :destroy]

  # GET /ajax/items
  # GET /ajax/items.json
  def index

  end

  def recommend

    @items = (0..12).map do |n|
      OpenStruct.new({name: "Jimmy Cool", age: "25"})
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
