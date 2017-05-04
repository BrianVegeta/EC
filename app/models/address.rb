class Address < ApiBase
  CITY_PATH = '/client/other/cities';
  AREA_PATH = '/client/other/area/';


  # service, page useless
  # def initialize(service, page)
  #   @options = { query: { site: service, page: page } }
  # end

  def get_cities
    response = self.class.get(CITY_PATH)
    case response.code
    when 200
      response['data']
    when 404
      raise 'NOT FOUND'
    else
      raise "ZOMG ERROR #{response.code}"
    end
  end

  def get_zones(city)
    response = self.class.get(URI.encode("#{AREA_PATH}#{city}"))
    case response.code
    when 200
      response['data'].map {|zone| zone['area']}
    when 404
      raise 'NOT FOUND'
    else
      raise "ZOMG ERROR #{response.code}"
    end
  end
end
