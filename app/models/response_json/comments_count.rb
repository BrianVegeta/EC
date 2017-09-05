class ResponseJson::CommentsCount
  class << self
    def structure
      {
        owner_comments_count: 0,
        #  -Int
        lessee_comments_count: 0,
        #  -Int
      }
    end
  end
end
