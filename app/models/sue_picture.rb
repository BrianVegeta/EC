class SuePicture
  extend ActiveModel::Naming
  extend ActiveModel::Callbacks

  include ActiveModel::Model
  include ActiveModel::Validations
  include Paperclip::Glue

  define_model_callbacks :save, only: [:after]
  define_model_callbacks :commit, only: [:after]
  define_model_callbacks :destroy, only: [:before, :after]

  attr_accessor :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at, :id
  attr_accessor :cid_no, :timestamp

  Paperclip.interpolates :cidnoxtimestamp do |attachment, style|
    "#{attachment.instance.cid_no}_#{attachment.instance.timestamp}"
  end
  Paperclip.interpolates :style do |attachment, style|
    "#{style.to_sym == :original ? '' : style.to_sym}"
  end
  has_attached_file :photo,
                    styles: {
                      :original => ['650x650#', :jpg],
                    },
                    :convert_options => {
                      original: '-background white -alpha remove',
                    },
                    bucket: 'shareappimg',
                    url: "#{Settings.s3_bucket.sue}/:cidnoxtimestamp:style.:extension",
                    path: "#{Settings.s3_bucket.sue}/:cidnoxtimestamp:style.:extension",
                    use_timestamp: false
  do_not_validate_attachment_file_type :photo

  def save
    run_callbacks :save do
      self.id = 1000 + Random.rand(9000)
    end
    return true
  end

  def destroy
    run_callbacks :destroy
  end

  def updated_at_short
    return Time.now.to_s(:autosave_time)
  end

  def errors
    obj = Object.new
    def obj.[](key)         [] end
    def obj.full_messages() [] end
    def obj.any?()       false end
    obj
  end
end
