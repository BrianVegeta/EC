class Ajax::ImagesController < ApplicationController
  # GET /images
  # GET /images.json

  # GET /images/item_cover.json
  def item_cover
    @uploader = ItemCover.new
    @uploader.userid = 'SAG00079'
    @uploader.timestamp = (Time.now.to_f * 1000).to_i
    @uploader.photo = params[:croppedImage]
    @uploader.save
    render json: { photoUrl: @uploader.photo.url }
  end

  # GET /images/sue_picture.json
  def sue_picture
    @uploader = SuePicture.new
    @uploader.cid_no = params[:cid_no]
    @uploader.timestamp = (Time.now.to_f * 1000).to_i
    @uploader.photo = params[:croppedImage]
    @uploader.save
    render json: { photoUrl: @uploader.photo.url }
  end
end
