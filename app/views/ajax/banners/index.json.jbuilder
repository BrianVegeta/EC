banners = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg']
json.array! banners do |banner|
  json.imageSrc image_path(banner);
end
