module ItemPath

  def escape_alias text
    text = text.gsub(/[^\u4e00-\u9fa5a-zA-Z0-9\-_]/, '-')
    text.gsub(/((-))+/, '-')
  end
end
