class Category < ApiBase

  # service, page useless
  # def initialize(service, page)
  #   @options = { query: { site: service, page: page } }
  # end

  def list
    response = self.class.post(PATH)
    case response.code
    when 200
      response['data']
    when 404
      raise 'NOT FOUND'
    else
      raise "ZOMG ERROR #{response.code}"
    end
  end

  def self.map_id shortname
    map = { goods: 1, service: 2, space: 3 }
    map[shortname]
  end
end
