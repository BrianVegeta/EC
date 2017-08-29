class Ajax::ImagesController < ApplicationController

  # PUT /images/item_cover.json
  def item_cover
    @uploader = ItemCover.new
    @uploader.userid = 'SAG00079'
    @uploader.timestamp = (Time.now.to_f * 1000).to_i
    @uploader.photo = params[:croppedImage]
    @uploader.save
    render json: { photoUrl: @uploader.photo.url }
  end

  # PUT /images/sue_picture.json
  def sue_picture
    @uploader = SuePicture.new
    @uploader.cid_no = params[:cid_no]
    @uploader.timestamp = (Time.now.to_f * 1000).to_i
    @uploader.photo = params[:croppedImage]
    @uploader.save
    render json: { photoUrl: @uploader.photo.url }
  end

  # PUT /images/avatar/:uid.json
  def avatar
    avatar = Images::Avatar.new(avatar_params)
    avatar.save
    render json: { photoUrl: avatar.photo.url }
  end

  protected
  def image_params
    params.permit(:image)
  end

  def avatar_params
    params.permit(:uid).merge(image_params)
  end
end
