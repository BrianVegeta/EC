class ItemCover
  extend ActiveModel::Naming
  extend ActiveModel::Callbacks

  include ActiveModel::Model
  include ActiveModel::Validations
  include Paperclip::Glue

  define_model_callbacks :save, only: [:after]
  define_model_callbacks :commit, only: [:after]
  define_model_callbacks :destroy, only: [:before, :after]

  attr_accessor :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at, :id

  # Paperclip.interpolates :timestamp do |attachment, style|
  #   attachment.instance.category.name
  # end
  has_attached_file :photo, styles: {
    :original => ["650x650", :jpg],
    :s => ["300x300", :jpg],
  }
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
