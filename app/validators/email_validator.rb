require 'mail'
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    i18n_model_name = record.class.name.downcase.gsub('::', '/')
    locale_path = "activemodel.errors.models.#{i18n_model_name}.attributes.#{attribute.to_s}.email"

    begin
      a = Mail::Address.new(value)
    rescue Mail::Field::ParseError
      record.errors[attribute] << (options[:message] || I18n.t(locale_path))
    end

    # regexp from http://guides.rubyonrails.org/active_record_validations.html
    value = a.address
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || I18n.t(locale_path))
    end
  end
end
