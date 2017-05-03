class Address < ApiBase
  PATH = '/client/other/cities'


  # service, page useless
  # def initialize(service, page)
  #   @options = { query: { site: service, page: page } }
  # end

  def get_cities
    response = self.class.get(PATH)
    case response.code
    when 200
      response['data']
    when 404
      raise 'NOT FOUND'
    else
      raise "ZOMG ERROR #{response.code}"
    end
  end
end
