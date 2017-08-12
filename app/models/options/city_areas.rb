class Options::CityAreas < ApiBase

  def path
    city_name = self.request_params['city_name']
    "/client/other/area/#{URI.encode(city_name)}"
  end

  def request_method
    :get
  end
end
