# encoding: utf-8
namespace :dev do
  desc "Rebuild"
  task :build => [ "tmp:clear", "log:clear" ]

  desc "Test "
  task :test => :environment do
    user = User.new(email: 'phyala2@mailnesia.com', password: 'password')
    user.regist_email
  end

  task :chick => :environment do
  	m_cypher = Cypher.new
 	  p m_cypher.encript('123124124', '1111')

  	#p m_cypher.encript('123bvadfs', '1111')
  	#p m_cypher.encript('adfdfadszxcvztg 12312', '1111')
  	#p m_cypher.encript('123bvaasdfasdfsadfs', '1111')
  	#p m_cypher.encript('123fasdfa1', '1111')
  end

end
