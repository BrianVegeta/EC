# for facebook
class Images::Avatar < Images::Base

  Paperclip.interpolates :useridxtimestamp do |attachment, style|
    userid = attachment.instance.userid
    timestamp = attachment.instance.timestamp
    "#{userid}_#{timestamp}_profile"
  end

  has_attached_file :photo,
                    styles: {
                      :original => ['100x100#', :jpg],
                    },
                    :convert_options => {
                      original: '-background white -alpha remove',
                    },
                    url: '/:useridxtimestamp:style.:extension',
                    path: '/:useridxtimestamp:style.:extension',
                    use_timestamp: false

  def initialize params
    self.userid = params[:uid]
    self.photo = params[:image] || params[:image_from_url]
    self.timestamp = (Time.now.to_f * 1000).to_i
  end
end
