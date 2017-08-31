# for facebook
class Images::Wish < Images::Base

  Paperclip.interpolates :useridxtimestamp do |attachment, style|
    userid = attachment.instance.userid
    timestamp = attachment.instance.timestamp
    "#{userid}_#{timestamp}_profile"
  end

  has_attached_file :photo,
                    styles: {
                      :original => [:jpg],
                    },
                    :convert_options => {
                      original: '-background white -alpha remove',
                    },
                    url: 'wish_debug/:useridxtimestamp:style.:extension',
                    path: 'wish_debug/:useridxtimestamp:style.:extension',
                    use_timestamp: false

  def initialize params
    self.userid = params[:uid]
    self.photo = params[:image] || params[:image_from_url]
    self.timestamp = (Time.now.to_f * 1000).to_i
  end
end
