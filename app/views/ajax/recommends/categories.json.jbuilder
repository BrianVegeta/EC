json.bannerUrl @coverUrl
json.set! :items do
  json.array! @items do |item|
    json.coverUrl item.cover_url
    json.name item.name
  end
end
