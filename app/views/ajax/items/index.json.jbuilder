json.array! @items do |item|
  json.coverUrl item.cover_url
  json.title item.title
  json.price item.price
  json.score item.score
  json.user do
    json.name item.username
    json.avatarUrl item.user_avatar_url
  end
end
