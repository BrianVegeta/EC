class PhoneValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    i18n_model_name = record.class.name.downcase.gsub('::', '/')
    locale_path = "activemodel.errors.models.#{i18n_model_name}.attributes.#{attribute.to_s}.email"
    # regexp from http://guides.rubyonrails.org/active_record_validations.html
    unless value =~ /\A09\d{8}\Z/i
      record.errors[attribute] << (options[:message] || I18n.t(locale_path))
    end
  end
end
