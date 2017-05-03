class Ajax::AddressesController < ApplicationController
  before_action :set_ajax_address, only: [:show, :edit, :update, :destroy]

  # GET /ajax/addresses
  # GET /ajax/addresses.json
  def index
    @cities = Address.new.get_cities
    render json: @cities
  end

  # GET /ajax/addresses/cities.json
  def cities
    @cities = Address.new.get_cities
    render json: @cities
  end

  # GET /ajax/addresses/1
  # GET /ajax/addresses/1.json
  def show
  end

  # GET /ajax/addresses/new
  def new
    @ajax_address = Ajax::Address.new
  end

  # GET /ajax/addresses/1/edit
  def edit
  end

  # POST /ajax/addresses
  # POST /ajax/addresses.json
  def create
    @ajax_address = Ajax::Address.new(ajax_address_params)

    respond_to do |format|
      if @ajax_address.save
        format.html { redirect_to @ajax_address, notice: 'Address was successfully created.' }
        format.json { render :show, status: :created, location: @ajax_address }
      else
        format.html { render :new }
        format.json { render json: @ajax_address.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ajax/addresses/1
  # PATCH/PUT /ajax/addresses/1.json
  def update
    respond_to do |format|
      if @ajax_address.update(ajax_address_params)
        format.html { redirect_to @ajax_address, notice: 'Address was successfully updated.' }
        format.json { render :show, status: :ok, location: @ajax_address }
      else
        format.html { render :edit }
        format.json { render json: @ajax_address.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ajax/addresses/1
  # DELETE /ajax/addresses/1.json
  def destroy
    @ajax_address.destroy
    respond_to do |format|
      format.html { redirect_to ajax_addresses_url, notice: 'Address was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ajax_address
      @ajax_address = Ajax::Address.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ajax_address_params
      params.fetch(:ajax_address, {})
    end
end
