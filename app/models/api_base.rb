class ApiBase
  include HTTParty
  base_uri Settings.api_base_uri
  HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
  headers HEADERS
end
